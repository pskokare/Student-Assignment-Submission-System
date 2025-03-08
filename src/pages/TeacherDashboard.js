import { useState } from "react";
import axios from "axios";
import "./TeacherAssignment.css"; // New CSS file to avoid conflicts
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newAssignment = { title, dueDate, description };
      await axios.post("http://localhost:5000/api/assignments/assign", newAssignment);

      toast.success("Assignment posted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Clear form fields
      setTitle("");
      setDueDate("");
      setDescription("");
    } catch (err) {
      setError("Error posting assignment. Try again.");
      toast.error("Error posting assignment!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="form-wrapper">
    <div className="teacher-assignment-container">
      <h1 className="teacher-heading">Teacher Dashboard</h1>

      {/* Simple Assignment Form */}
      <div className="assignment-form-box">
        <h2 className="form-title">Post Assignment</h2>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="form-label">Due Date:</label>
          <input
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <label className="form-label">Description:</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button type="submit" disabled={loading} className="post-btn">
            {loading ? "Posting..." : "Assign work"}
          </button>

           {/* View Submissions Button */}
        <button type="button" className="submissions-btn" onClick={() => navigate("/view-submissions")}>
          View Submissions
        </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default TeacherDashboard;
