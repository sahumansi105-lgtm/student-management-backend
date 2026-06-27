const multer = require("multer");
const path = require("path");

// ==============================
// Storage Configuration
// ==============================
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "src/uploads");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

// ==============================
// File Filter
// ==============================
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    }

    cb(new Error("Only JPG, JPEG and PNG images are allowed."));
};

// ==============================
// Upload Middleware
// ==============================
const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 2 * 1024 * 1024 // 2 MB
    }

});

module.exports = upload;