import mongoose from "mongoose";
const Comments = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },

    likesComment: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("comments", Comments);
