const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
};
const mongoose = require("mongoose");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:

// const cohorts = require("./cohorts.json");
// const students = require("./students.json");

//DYNAMIC DATA FROM DATABASE
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

//DB CONNECTION (DAY 2)
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Cohorts get w/static file
// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });

//Cohorts get w/DB
app.get("/api/cohorts", (req, res) => {
  Cohort.find({}).then((cohorts) => {
    console.log("Retrieved cohorts", cohorts);
    res.json(cohorts);
  });
});

//Students GET w static file
// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

//Students GET w DB
app.get("/api/students", (req, res) => {
  Student.find({}).then((students) => {
    console.log("Retrieved students", students);
    res.json(students);
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
