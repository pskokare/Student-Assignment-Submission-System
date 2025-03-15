
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Dashboard.css";
import SubmissionForm from "./SubmissionForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [submittedAssignments, setSubmittedAssignments] = useState(
    JSON.parse(localStorage.getItem("submittedAssignments")) || {}
  );

  // Fetch assignments from API
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/assignments/getassign");
        setAssignments(response.data);
      } catch (error) {
        setError("Failed to fetch assignments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Logout function
  const handleLogout = () => {
    toast.info("Logged out successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  // Handle submission form opening
  const handleOpenForm = (assignmentId) => {
    setSelectedAssignmentId(assignmentId);
    setIsFormOpen(true);
  };

  // Update submitted status on success
  const handleSubmissionSuccess = (assignmentId) => {
    const updatedSubmittedAssignments = { ...submittedAssignments, [assignmentId]: true };

    setSubmittedAssignments(updatedSubmittedAssignments);
    localStorage.setItem("submittedAssignments", JSON.stringify(updatedSubmittedAssignments));

    setIsFormOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src="../images/panini.png" alt="Company Logo" className="logo" />
          <h2 className="nav-title">Assignment Dashboard</h2>
        </div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div className="dashboard-content">
        {/* Loading & Error Handling */}
        {loading ? (
          <p>Loading assignments...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="assignment-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td>{assignment.title}</td>
                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                    <td>{assignment.description}</td>
                    <td>
                      {submittedAssignments[assignment._id] ? (
                        <span className="submitted-text">Submitted</span>
                      ) : (
                        <button
                          className="submit-btn"
                          onClick={() => handleOpenForm(assignment._id)}
                        >
                          Submit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No assignments available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Submission Form Modal */}
        {isFormOpen && (
          <SubmissionForm
            assignmentId={selectedAssignmentId}
            onClose={() => setIsFormOpen(false)}
            onSubmitSuccess={handleSubmissionSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;


