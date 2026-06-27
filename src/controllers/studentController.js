const prisma = require("../config/prisma");
const validator = require("validator");

// ==========================
// CREATE STUDENT
// ==========================
const createStudent = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        const existingStudent = await prisma.student.findUnique({
            where: { email }
        });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student already exists"
            });
        }

        const student = await prisma.student.create({
            data: {
                name,
                email,
                age: Number(age)
            }
        });

        return res.status(201).json({
            message: "Student created successfully",
            student
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// ==========================
// GET ALL STUDENTS (PAGINATION)
// ==========================
const getAllStudents = async (req, res) => {
    try {
        let { page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;

        const students = await prisma.student.findMany({
            skip,
            take: limit,
            orderBy: {
                id: "desc"
            }
        });

        const totalStudents = await prisma.student.count();

        return res.status(200).json({
            message: "Students fetched successfully",
            data: students,
            pagination: {
                total: totalStudents,
                page,
                limit,
                totalPages: Math.ceil(totalStudents / limit)
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// ==========================
// GET STUDENT BY ID
// ==========================
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await prisma.student.findUnique({
            where: { id: Number(id) }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.status(200).json({
            message: "Student fetched successfully",
            student
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// ==========================
// UPDATE STUDENT (FIXED)
// ==========================
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

        const student = await prisma.student.findUnique({
            where: { id: Number(id) }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // ==========================
        // EMAIL DUPLICATE CHECK (IMPORTANT FIX)
        // ==========================
        if (email) {
            if (!validator.isEmail(email)) {
                return res.status(400).json({
                    message: "Invalid email format"
                });
            }

            const existingEmail = await prisma.student.findFirst({
                where: {
                    email,
                    NOT: {
                        id: Number(id)
                    }
                }
            });

            if (existingEmail) {
                return res.status(400).json({
                    message: "Email already in use"
                });
            }
        }

        // ==========================
        // PARTIAL UPDATE (BEST PRACTICE)
        // ==========================
        const data = {};
        if (name) data.name = name;
        if (email) data.email = email;
        if (age) data.age = Number(age);

        const updatedStudent = await prisma.student.update({
            where: { id: Number(id) },
            data
        });

        return res.status(200).json({
            message: "Student updated successfully",
            updatedStudent
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// ==========================
// DELETE STUDENT
// ==========================
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await prisma.student.findUnique({
            where: { id: Number(id) }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        await prisma.student.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// ==========================
// EXPORT
// ==========================
module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};