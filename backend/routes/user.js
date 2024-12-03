require("dotenv").config();
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db/db");
const bcrypt = require("bcrypt");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const signupZod = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;

  const success = signupZod.safeParse({
    username,
    password,
    firstName
  });

  if (!success) {
    return res.status(400).json({
      message: "Invalid username/password",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    firstName,
    password: hashedPassword,
  });

  console.log(user);

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "User successfully created",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const success = signupZod.safeParse({
    username,
    password,
  });

  if (!success) {
    return res.status(400).json({
      message: "Invalid username/ password",
    });
  }
  const user = await User.findOne({
    username,
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const authentication = await bcrypt.compare(password, user.password);
  if (!authentication) {
    return res.status(401).json({
      message: "Password incorrect",
    });
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "Sign in successful",
    token: token,
  });
});

module.exports = router;
