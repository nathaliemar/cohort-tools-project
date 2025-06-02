const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const { isAuthenticated } = require("../config/middleware.config");

//GET user by Id
router.get("/api/users/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const foundUser = await User.findById(userId);
    console.log("User retrieved", foundUser);
    res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
