import express from "express";
import {
  checkToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth.js";
import Cart from "../models/CartModels.js";
const router = express.Router();

router.post("/", checkToken, async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const savedCart = await cart.save();

    res.status(200).json({
      results: savedCart,
    });
  } catch (error) {
    res.status(500).json({ msg: "Failed" });
  }
});

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Update product successfully",
      results: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ msg: "Failed" });
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
