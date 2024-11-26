const express = require("express");
require("dotenv").config;
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel");
const { configDotenv } = require("dotenv");

const router = express.Router();
const client = new OAuth2Client(process.env.CLIENT_ID);

router.post("/api/google-login", async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });
    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        avatar: picture,
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during Google Login:", error);
    res.status(500).json({ message: "Google Login failed" });
  }
});

module.exports = router;
