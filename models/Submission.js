const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Assignment" },
  studentName: { type: String, required: true },
  rollNo: { type: String, required: true },
  studentClass: { type: String, required: true },
  title: { type: String, required: true },
  completedDate: { type: Date, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model("Submission", submissionSchema);
