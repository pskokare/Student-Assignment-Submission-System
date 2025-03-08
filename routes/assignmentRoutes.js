const express = require("express");
const router = express.Router();
const {
  getAssignments,
  createAssignment,
} = require("../controllers/assignmentController");

// Route to get all assignments
router.get("/getassign", getAssignments);

// Route to create a new assignment
router.post("/assign", createAssignment);

module.exports = router;
