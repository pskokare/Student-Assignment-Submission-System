import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewSubmissions.css"; // Add CSS for styling

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]); // ✅ Fix: Add setSubmissions

  useEffect(() => {
    // Fetch submitted work from backend
    axios.get("http://localhost:5000/api/submission/submitedwork")
      .then(response => {
        console.log("Fetched Data:", response.data); // ✅ Debugging log
        setSubmissions(response.data); // ✅ Fix: Store response data in state
      })
      .catch(error => console.error("Error fetching submissions:", error));
  }, []);

  return (
    <div className="submissions-container">
      <h2>Submitted Work</h2>
      <table className="submissions-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Assignment Title</th>
            <th>File</th>
            <th>Submission Date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td>{submission.studentName}</td>
              <td>{submission.title}</td> {/* ✅ Fix: Changed assignmentTitle to title */}
              <td>{submission.filePath}</td> {/* ✅ Fix: Changed file to filePath */}
              <td>{new Date(submission.completedDate).toLocaleString()}</td> {/* ✅ Fix: Changed createdAt to completedDate */}
              <td>
                <a 
                  href={`http://localhost:5000/${submission.filePath}`} 
                  download
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  📥 Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSubmissions;
