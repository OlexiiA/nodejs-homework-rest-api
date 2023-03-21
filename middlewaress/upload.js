const multer  = require('multer');
const path = require("path");

// =========-----налаштування мідлвари-----===========
const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 2048,
    }
});

// =====-----сама мідлевара-----=====
const upload = multer({
    storage: multerConfig
});

module.exports = upload


