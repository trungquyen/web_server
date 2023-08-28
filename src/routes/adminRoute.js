import express from "express";
import AdminModel from "../models/AdminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import { adminControllers } from "../controllers/adminControllers.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const Admin = await AdminModel.find();
    res.status(200).json(Admin);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.post("/new", async (req, res) => {
//   try {
//     const admin = new AdminModel({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     });
//     const admins = await admin.save();

//     res.status(200).json({
//       results: admins,
//       msg: "Register successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       error,
//       msg: "Register failed",
//     });
//   }
// });

router.post("/new", adminControllers.addAdmin);

export default router;