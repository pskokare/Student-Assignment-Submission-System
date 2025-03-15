const Assignment = require("../models/assignmentModel");

// Fetch all assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments" });
  }
};

// Add a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, dueDate, description } = req.body;
    const newAssignment = new Assignment({ title, dueDate, description });
    await newAssignment.save();
    res.status(201).json({ message: "Assignment created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment" });
  }
};
