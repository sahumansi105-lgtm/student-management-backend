const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    addMarks,
    getAllMarks,
    getMarksByStudent,
    updateMarks,
    deleteMarks
} = require("../controllers/markController");

// Add Marks (ADMIN)
router.post("/", authMiddleware, adminMiddleware, addMarks);

// Get All Marks
router.get("/", authMiddleware, getAllMarks);

// Get Marks By Student
router.get("/student/:studentId", authMiddleware, getMarksByStudent);

// Update Marks (ADMIN)
router.put("/:id", authMiddleware, adminMiddleware, updateMarks);

// Delete Marks (ADMIN)
router.delete("/:id", authMiddleware, adminMiddleware, deleteMarks);

module.exports = router;