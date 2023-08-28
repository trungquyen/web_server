import mongoose from "mongoose";
import isEmail from "validator";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        msg: "Username error",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail,
        msg: "Email error",
      },
    },

    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", UserSchema);
