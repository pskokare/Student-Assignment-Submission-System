import React, { useState } from "react";
import axios from "axios";
import "./SubmissionForm.css"; // Import CSS for styling

const SubmissionForm = ({ assignmentId, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNo: "",
    studentClass: "",
    title: "",
    completedDate: "",
    file: null, // Added file field
  });

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("assignmentId", assignmentId);
    formDataToSend.append("studentName", formData.studentName);
    formDataToSend.append("rollNo", formData.rollNo);
    formDataToSend.append("studentClass", formData.studentClass);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("completedDate", formData.completedDate);
    formDataToSend.append("file", formData.file); // Attach file
  
    try {
        await axios.post("http://localhost:5000/api/submission/submitwork", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });
  
      alert("Work submitted successfully!");
      onSubmitSuccess(assignmentId);
    } catch (error) {
      console.error("Error submitting work:", error);
      alert("Failed to submit work. Please try again.");
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Submit Work</h2>
        <form onSubmit={handleSubmit}>
          <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
          />

          <label>Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />

          <label>Class:</label>
          <input
            type="text"
            name="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
            required
          />

          <label>Title of Submission:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* File Upload Option */}
          <label>Upload File:</label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
            required
          />

          <label>Date of Completion:</label>
          <input
            type="date"
            name="completedDate"
            value={formData.completedDate}
            onChange={handleChange}
            required
          />

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Work
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
