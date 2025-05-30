const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

function middlewareConfig(app) {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: "*",
      // origin: "http://localhost:5173",
    })
  );
}
function isAuthenticated(req, res, next) {
  try {
    //get token from authorization header "Bearer 4567d2w..."
    const token = req.headers.authorization.split(" ")[1];

    //Verify token, if verified -> payload
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    //Add payload to request object for use in next middleware or route
    req.payload = payload;

    //call next to pass the rquest on
    next();
  } catch (error) {
    res.status(401).json("token not provided or not valid");
  }
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
}

function notFoundHandler(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
}

module.exports = {
  middlewareConfig,
  errorHandler,
  notFoundHandler,
  isAuthenticated,
};
