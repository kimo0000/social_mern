const Profile = require("../models/UserSchema");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update User:
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch(err){
        return res.status(500).json(err);
      }
    }

    try {
      const user = await Profile.findByIdAndUpdate(req.params.id,
        {$set: req.body});
        console.log(user);
        res.status(200).json("Account Has been updated");
      } catch(err) {
        return res.status(500).json(err);
      }
  } else {
    return res.status(403).json("You can't only update your account!");
  }
});

// Delete User:
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await Profile.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted succesfully");
      } catch(err) {
        return res.status(500).json(err);
      }
  } else {
    return res.status(403).json("You can't Only Delete Your Account!");
  }
});

// Get User:
router.get("/", async (req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  try {
      const user = userId 
      ? await Profile.findById(userId)
      : await Profile.findOne({username: username});
      const {password, updatedAt, ...other} = user._doc;
      res.status(200).json(other);
    } catch(err) {
      res.status(500).json(err);
    }
});

// Get Friends:
router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await Profile.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map(friendId => {
        return Profile.findById(friendId);
      })
    ) 
    let friendList = [];
    friends.map(friend => {
      const {_id, username, profilePicture} = friend;
      friendList.push({_id, username, profilePicture});
    });
    res.status(200).json(friendList);
  } catch(err) {
    res.status(500).json(err);
  }
})

// Follow User:
router.put("/:id/follow", async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try {
      const user = await Profile.findById(req.params.id);
      const currentUser = await Profile.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)) {
        await user.updateOne({$push: {followers: req.body.userId}});
        await currentUser.updateOne({$push: {followings: req.params.id}});
        res.status(200).json("User Has Been Followed");
      } else {
       res.status(403).json("You Allready Follower This User");
      }
    } catch(err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't Follow yourself!");
  }
});

// Unfolow User:
router.put("/:id/unfollow", async (req, res) => {
  if(req.body.userId !== req.params.id) {
    
    try {
      const user = await Profile.findById(req.params.id);
      const currentUser = await Profile.findById(req.body.userId);
      console.log(user, "*".repeat(10), currentUser);
      if(user.followers.includes(req.body.userId)) {
        await user.updateOne({$pull: {followers: req.body.userId}});
        await currentUser.updateOne({$pull: {followings: req.params.id}});
        res.status(200).json("User Has Been unfollowed");
      } else {
       res.status(403).json("You Don't follower This User");
      }
    } catch(err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself!");
  }
});

module.exports = router;
