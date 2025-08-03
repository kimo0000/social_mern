const router = require("express").Router();
const {json}  = require("express");
const Posts = require("../models/PostSchema");
const Profile = require("../models/UserSchema");

// create a post
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post update successfully");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(403).json("post deleted succesfully");
    } else {
      res.status(403).json("you can delete only your post");
    }
    await Posts.findByIdAndDelete(req.params.id);
    res.status(200).json("post deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// like - dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("like success");
    } else {
      await post.updateOne({$pull: {likes: req.body.userId}})
      res.status(200).json("dislike success");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const { updatedAt, ...others } = post._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get timeline post
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await Profile.findById(req.params.userId);
    const userPosts = await Posts.find({userId: currentUser._id});
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId => {
        return Posts.find({userId: friendId});
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's all posts:
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await Profile.findOne({username: req.params.username});
    const userPosts = await Posts.find({userId: user._id});
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
