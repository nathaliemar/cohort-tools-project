const express = require("express");
const Student = require("../models/Student.model");
const router = express.Router();
const { isAuthenticated } = require("../config/middleware.config");

//GET Students
router.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({}).populate("cohort"); //use populate to fill in cohort data
    console.log("Retrieved students", students);
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

//POST student
router.post("/api/students/", isAuthenticated, async (req, res) => {
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
    next(error);
  }
});

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
router.get("/api/students/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params;
  try {
    const foundStudents = await Student.find({ cohort: cohortId }).populate(
      "cohort"
    ); //populate with actual cohort data
    console.log("Retrieved students", foundStudents);
    res.status(200).json(foundStudents);
  } catch (error) {
    next(error);
  }
});

//!THE ONLY PROTECTED ROUTE
//GET /api/students/:studentId - Retrieves a specific student by id
router.get("/api/students/:studentId", isAuthenticated, async (req, res) => {
  const { studentId } = req.params;
  try {
    const foundStudent = await Student.findById(studentId).populate("cohort"); //add actual cohort details
    console.log("Student retrieved", foundStudent);
    res.status(200).json(foundStudent);
  } catch (error) {
    next(error);
  }
});

//PUT /api/students/:studentId - Updates a specific student by id
router.put("/api/students/:studentId", async (req, res) => {
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
    next(error);
  }
});

//DELETE /api/students/:studentId - Deletes a specific student by id
router.delete("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    await Student.findByIdAndDelete(studentId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
