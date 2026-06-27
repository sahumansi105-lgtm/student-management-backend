// ================================
// Admin Authorization Middleware
// ================================

const adminMiddleware = (req, res, next) => {

    // Check if user role is ADMIN
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: "Access Denied. Admin Only."
        });
    }

    next();
};

module.exports = adminMiddleware;