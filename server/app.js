const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  // origin: "http://localhost:5173",
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

//!############## COHORT ROUTES ##############

//Cohorts get w/static file
// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });

//GET cohorts
app.get("/api/cohorts", async (_, res, next) => {
  try {
    const cohorts = await Cohort.find();
    console.log("Retrieved cohorts", cohorts);
    res.json(cohorts);
  } catch (error) {
    console.log("Error retrieving cohorts", error);
    // next(error)
  }
  // Cohort.find({}).then((cohorts) => {
  //   console.log("Retrieved cohorts", cohorts);
  //   res.json(cohorts);
  // });
});

//GET cohort by id
app.get("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    const foundCohort = await Cohort.findById(cohortId);
    console.log("Cohort retrieved", foundCohort);
    res.status(200).json(foundCohort);
  } catch (error) {
    console.log("Error retrieving cohort", error);
    res.status(500).json({ error: "Could not retrieve cohort" });
  }
});
//POST cohort
app.post("/api/cohorts", async (req, res) => {
  try {
    const newCohort = await Cohort.create({
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });
    console.log("New cohort created", newCohort);
    res.status(201).json(newCohort);
  } catch (error) {
    console.log("Error when creating cohort", error);
    res.status(500).json({ error: "Could not create cohort" });
  }
});
//PUT cohort
app.put("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, {
      new: true,
    });
    console.log("Cohort updated", updatedCohort);
    res.status(200).json(updatedCohort);
  } catch (error) {
    console.log("Error updating cohort", error);
    res.status(500).json({ error: "Failed to update cohort" });
  }
});

//DELETE cohort by id
app.delete("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    await Cohort.findByIdAndDelete(cohortId);
    res.status(204).send();
  } catch (error) {
    console.log("Error deleting cohort", error);
    res.status(500).json({ error: "Failed to delete cohort" });
  }
});

//!############## STUDENT ROUTES ##############

//Students GET w static file
// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

// GET students then
// app.get("/api/students", (_, res) => {
//   Student.find({}).then((students) => {
//     console.log("Retrieved students", students);
//     res.json(students);
//   });
// });

//GET Students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({}).populate("cohort"); //use populate to fill in cohort data
    console.log("Retrieved students", students);
    res.status(200).json(students);
  } catch (error) {
    console.log("Error while retrieving students", error);
    res.status(500).json({ error: "Failed to retrieve student" });
  }
});

//POST student
app.post("/api/students/", async (req, res) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: req.body.projects,
    });
    console.log("New student created!", newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    console.log("Error while creating user", error);
    res.status(500).json({ error: "Failed to create student" });
  }
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    const foundStudents = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    ); //populate with actual cohort data
    console.log("Retrieved students", foundStudents);
    res.status(200).json(foundStudents);
  } catch (error) {
    console.log("Error retrieving students", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});

//GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const foundStudent = await Student.findById(studentId).populate("cohort"); //add actual cohort details
    console.log("Student retrieved", foundStudent);
    res.status(200).json(foundStudent);
  } catch (error) {
    console.log("Error retrieving student", error);
    res.status(500).json({ error: "Failed to retrieve student" });
  }
});

//PUT /api/students/:studentId - Updates a specific student by id
app.put("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true }
    );
    console.log("Student was updated", updatedStudent);
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log("Error while updating student", error);
    res.status(500).json({ error: "Failed to update student" });
  }
});

//DELETE /api/students/:studentId - Deletes a specific student by id
app.delete("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    await Student.findByIdAndDelete(studentId);
    res.status(204).send();
  } catch (error) {
    console.log("Error deleting student", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
