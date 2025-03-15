const express = require("express");
const { submitWork, upload, getAllSubmissions } = require("../controllers/submissionController");

const router = express.Router();

// ✅ Route for submitting work
router.post("/submitwork", upload.single("file"), submitWork);

// ✅ Route to fetch all submissions
router.get("/submitedwork", getAllSubmissions);

module.exports = router;
