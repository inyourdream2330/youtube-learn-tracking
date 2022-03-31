const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const verifyToken = require("../middleware/auth.js");
const addCors = require("../middleware/addCors");
// @route GET api/posts
// @desc GET posts
// @access Private
router.get("/", addCors, verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", addCors, verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //   Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "title is required" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url:  url,
      status: status || "NOT LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Happy learning", post: newPost });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private

router.put("/:id", addCors, verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //   Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "title is required" });
  }
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: url,
      status: status || "NOT LEARN",
      user: req.userId,
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    // User not authorised to update post or post not found
    if (!updatedPost) {
      return res.status(403).json({
        success: false,
        message: "User not authorised to update post or post not found",
      });
    }
    res.json({ success: true, message: "udpate success", post: updatedPost });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private

router.delete("/:id", addCors, verifyToken, async (req, res) => {
  const postDeleteCondition = { _id: req.params.id, user: req.userId };
  const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
  // User not authorised to update post or post not found
  if (!deletedPost) {
    return res.status(403).json({
      success: false,
      message: "User not authorised to update post or post not found",
    });
  }
  res.json({ success: true, post: deletedPost });
});

module.exports = router;
