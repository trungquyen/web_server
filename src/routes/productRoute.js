import express from "express";
import {
  checkToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth.js";
import Product from "../models/ProductModels.js";
const router = express.Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const { title, desc, img, categories, size, color, price } = req.body;
  const product = new Product({
    title,
    desc,
    img,
    categories,
    size,
    color,
    price,
  });
  try {
    await product.save();
    res.status(200).json({
      message: true,
      results: product,
    });
  } catch (error) {
    res.status(401).json({ msg: "Failed" });
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    await updatedProduct.save();
    res.status(200).json({
      message: "Updated product successfully",
      results: updatedProduct,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.deleteOne();

    res.status(200).json({ message: "Delete product successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/listproduct", async (req, res) => {
  try {
    const product = await Product.find();

    res
      .status(200)
      .json({ message: "Get product successfully", results: product });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a product

router.get(`/details/:id`, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/category", async (req, res) => {
  const qNum = req.query.qNum;
  const category = req.query.category;

  try {
    let products;
    if (qNum) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (category) {
      products = await Product.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({
      results: products,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get(`/search`, async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const titleReg = new RegExp(keyword, "i");

    const results = await Product.find({
      title: titleReg,
    });

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
});
export default router;
