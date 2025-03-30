const express = require("express");
const auth=require("../utils/jwt&key")
const router = express.Router();
const { predict } = require("../controllers/plantdisease_controller");
const cloudinary = require('../utils/cloudinary');

// Use Multer with memory storage (does not store the file, keeps it in memory)
router.route("/").post(auth.verifyAuthToken,predict)
router.route("/api-key").get(auth.verifyApiKey,predict)

module.exports = router;
