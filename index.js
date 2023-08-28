import express from "express";
import dotenv from "dotenv"
import db from "./src/database/index.js";
import userRoutes from "./src/routes/userRoutes.js";
import productRoute from "./src/routes/productRoute.js";
import cartRoutes from "./src/routes/cartRoute.js";
import checkoutRote from "./src/routes/checkoutRoute.js";
import commentRoute from "./src/routes/commentRoute.js";
import cors from "cors";
import morgan  from "morgan";
const app = express();

dotenv.config();
db()

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use("/users", userRoutes);
app.use("/product", productRoute);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRote);
app.use("/comment", commentRoute);
app.listen(process.env.PORT || 8000, async () => {
    console.log("Server is running");
});