const express = require("express");
const router = express.Router();

const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// ==========================
// CREATE STUDENT
// POST /students
// ==========================
router.post("/", createStudent);

// ==========================
// GET ALL STUDENTS
// GET /students
// ==========================
router.get("/", getAllStudents);

// ==========================
// GET STUDENT BY ID
// GET /students/:id
// ==========================
router.get("/:id", getStudentById);

// ==========================
// UPDATE STUDENT
// PUT /students/:id
// ==========================
router.put("/:id", updateStudent);

// ==========================
// DELETE STUDENT
// DELETE /students/:id
// ==========================
router.delete("/:id", deleteStudent);

module.exports = router;