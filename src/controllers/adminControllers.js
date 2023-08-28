// import AdminModel from "../models/AdminModel.js";
// const {admin} = require("../models/AdminModel")

// export const adminControllers = {
//     addAdmin: async (req, res) => {
//         try {
//           const admin = new AdminModel({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//           });
//           const admins = await admin.save();
      
//           res.status(200).json({
//             results: admins,
//             msg: "Register successfully",
//           });
//         } catch (error) {
//           res.status(500).json({
//             error,
//             msg: "Register failed",
//           });
//         }
//     },
// };

