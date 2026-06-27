const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Added for form-data support

// ==========================
// Serve Uploaded Images
// ==========================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================
// Import Routes
// ==========================
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const markRoutes = require("./routes/markRoutes");

// ==========================
// Home Route
// ==========================
app.get("/", (req, res) => {
    res.send("🚀 Student Management Backend Running Successfully");
});

// ==========================
// API Routes
// ==========================

// Auth Routes
app.use("/auth", authRoutes);

// Student Routes
app.use("/students", studentRoutes);

// Marks Routes
app.use("/marks", markRoutes);

// ==========================
// 404 Route Handler
// ==========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ==========================
// Global Error Handler (IMPORTANT)
// ==========================
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});