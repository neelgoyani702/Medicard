// const express = require("express");
// const router = express.Router();
// // const User = require("../models/User");
// const Register = require("../models/Register");
// const bcrypt = require("bcrypt");

// router.post("/signup", async (req, res) => {
//   const { userId, password } = req.body;

//   let user = await User.find({ userId: userId });
//   if (!user) {
//     return res.status(409).json({ message: "User already exists" });
//   }

//   const salt = await bcrypt.genSalt(10);
//   const secPass = await bcrypt.hash(password, salt);

//   user = await User.create({ userId: userId, password: secPass });

//   return res.status(201).send({ user });
// });

// router.post("/login", async (req, res) => {
//   const { userId, password } = req.body;

//   try {
//     const user = await User.findOne({ userId });
//     if (user) {
//       const passwordComapre = await bcrypt.compare(password, user.password);
//       if (passwordComapre) {
//         return res.status(200).json({ user });
//       } else {
//         return res.status(401).json({ message: "Invalid password" });
//       }
//     } else {
//       return res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal server error occured");
//   }
// });

// module.exports = router;

require("dotenv").config({ path: "../.env" });
const Register = require("../models/Register");
const bcrypt = require("bcrypt");
const genToken = require("../service/jwttokenService");
const {
  AuthSignupValidator,
  AuthLoginValidator,
} = require("../service/validator/authValidator");

exports.authSignUp = async (req, res) => {
  const { userId, password } = req.body;
  const { error } = AuthSignupValidator.validate(req.body);

  // console.log("User Id : ", userId);

  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  const user = await Register.findOne({ userId: userId });
  if (user) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);

  const newUser = new Register({ userId, password: secPass });
  await newUser.save();

  return res.status(200).json({ success: true, message: "User created" });
};

exports.authLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await Register.findOne({ userId });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User with this email not exist.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password.",
      });
    }

    const payload = {
      _id: user._id,
      userId: user.userId,
    };

    const authToken = genToken(payload);

    res.status(200).send({
      success: true,
      result: authToken,
      _id: user._id,
      userId: user.userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "An error occurred. Check server logs for details.",
    });
  }
};
