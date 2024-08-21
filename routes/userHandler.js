const express = require("express");
const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// creating user model
const userSchema = require("../schema/user.schema");


const User = mongoose.model("User", userSchema);

// defining routes

// signup route
router.post("/signup", async (req, res) => {
  try {
    // useing brcypt pkg to protect user password
    hashedPassword = await brcypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: "Signup failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Authetication failed!" });
    }
    if (user) {
      const checkPassword = await brcypt.compare(
        req.body.password,
        user.password
      );
      if (checkPassword) {

        // genarating JWT token
        const token = jwt.sign({
            username: user.username,
            userId: user._id
        }, process.env.JWT_SECRET_KEY)

        return res.status(200).json({
          message: "Login successful",
          jwt_token: token
        });
      }else{
        return res.status(401).json({ message: "Authetication failed!" });
      }
    }
  } catch {
    res.status(500).json({ message: "Server error!!" });
  }
});

module.exports = router;
