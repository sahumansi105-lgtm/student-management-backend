const prisma = require("../config/prisma");

// ==============================
// Add Marks
// ==============================
const addMarks = async (req, res) => {
    try {

        const { studentId, subject, marks } = req.body;

        if (!studentId || !subject || marks == null) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const student = await prisma.student.findUnique({
            where: {
                id: Number(studentId)
            }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        const newMark = await prisma.mark.create({
            data: {
                studentId: Number(studentId),
                subject,
                marks: Number(marks)
            }
        });

        res.status(201).json({
            message: "Marks Added Successfully",
            mark: newMark
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// ==============================
// Get All Marks
// ==============================
const getAllMarks = async (req, res) => {

    try {

        const marks = await prisma.mark.findMany({
            include: {
                student: true
            }
        });

        res.status(200).json(marks);

    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ==============================
// Get Marks By Student
// ==============================
const getMarksByStudent = async (req, res) => {

    try {

        const studentId = Number(req.params.studentId);

        const marks = await prisma.mark.findMany({
            where: {
                studentId
            }
        });

        res.status(200).json(marks);

    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ==============================
// Update Marks
// ==============================
const updateMarks = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { subject, marks } = req.body;

        const existing = await prisma.mark.findUnique({
            where: {
                id
            }
        });

        if (!existing) {
            return res.status(404).json({
                message: "Marks Not Found"
            });
        }

        const updated = await prisma.mark.update({
            where: {
                id
            },
            data: {
                subject,
                marks: Number(marks)
            }
        });

        res.status(200).json({
            message: "Marks Updated Successfully",
            updated
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ==============================
// Delete Marks
// ==============================
const deleteMarks = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const existing = await prisma.mark.findUnique({
            where: {
                id
            }
        });

        if (!existing) {
            return res.status(404).json({
                message: "Marks Not Found"
            });
        }

        await prisma.mark.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Marks Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    addMarks,
    getAllMarks,
    getMarksByStudent,
    updateMarks,
    deleteMarks
};