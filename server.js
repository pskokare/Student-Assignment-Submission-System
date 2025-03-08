const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Only allow frontend requests
  credentials: true // Allow cookies and authentication headers
}));

// Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

//assignment routes
const assignmentRoutes = require("./routes/assignmentRoutes");
app.use("/api/assignments", assignmentRoutes);

//submission
// const Submission = require("./models/Submission");
// app.use("/api/submissions", require("./routes/submissionRoutes"));

const submissionRoutes = require ("./routes/submissionRoutes");
app.use ("/api/submission", submissionRoutes);

const multer = require("multer");
app.use("/uploads", express.static("uploads"),multer);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
