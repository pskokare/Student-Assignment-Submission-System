const Submission = require("../models/Submission");
const multer = require("multer");
const path = require("path");

// ✅ Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// ✅ Submit Work
const submitWork = async (req, res) => {
  try {
    const { assignmentId, studentName, rollNo, studentClass, title, completedDate } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const submission = new Submission({
      assignmentId,
      studentName,
      rollNo,
      studentClass,
      title,
      completedDate,
      filePath: req.file.path, // Store file path
    });

    await submission.save();
    res.status(201).json({ message: "Work submitted successfully", submission });
  } catch (error) {
    console.error("Error submitting work:", error);
    res.status(500).json({ message: "Failed to submit work", error });
  }
};

// ✅ Fetch All Submissions
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions" });
  }
};

// ✅ Export all functions correctly
module.exports = { submitWork, upload, getAllSubmissions };
