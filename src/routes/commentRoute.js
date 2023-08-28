import express from "express";
import Comments from "../models/CommentModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const comments = new Comments({
      ...req.body,
    });
    await comments.save();
    const newComment = await Comments.findOne({ _id: comments._id }).populate(
      "userId"
    );

    res.status(200).json({
      success: true,
      results: newComment,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await Comments.find({ postId }).populate("userId");
    res.status(200).json({
      success: true,
      results: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server not found!",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const deleteComment = await Comments.findByIdAndDelete({ _id });
    if (deleteComment) {
      res.status(200).json("Delete comment success");
    }
  } catch (error) {}
});

export default router;
