import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);

dotenv.config();
// mongodb+srv://vtquyen2k1:<password>@cluster0.2bfk8no.mongodb.net/

async function db() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.2bfk8no.mongodb.net/${process.env.DB_DATABASE}`
    );
    console.log("Connected success");
  } catch (error) {
    console.log("Failed");
  }
}
export default db;