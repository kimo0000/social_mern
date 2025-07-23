const router = require('express').Router();
const Profile = require("../models/UserSchema");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
     // generate password:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user:
    const newProfile = new Profile({
     username: req.body.username,
     email: req.body.email,
     password: hashedPassword,
    });

    // save user and respond:
    const user = await newProfile.save();
    res.status(200).json(user);
   } catch(err) {
     console.log(err);
   }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await Profile.findOne({email: req.body.email});

    res.status(200).json(user);

    const validPassword = bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("password not valid");

    !user && res.status(404).json('User not Found');
    
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;