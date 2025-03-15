// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./ViewSubmissions.css"; // Add CSS for styling

// const ViewSubmissions = () => {
//   const [submissions, setSubmissions] = useState([]); // ✅ Fix: Add setSubmissions

//   useEffect(() => {
//     // Fetch submitted work from backend
//     axios.get("http://localhost:5000/api/submission/submitedwork")
//       .then(response => {
//         console.log("Fetched Data:", response.data); // ✅ Debugging log
//         setSubmissions(response.data); // ✅ Fix: Store response data in state
//       })
//       .catch(error => console.error("Error fetching submissions:", error));
//   }, []);

//   return (
//     <div className="submissions-container">
//       <h2>Submitted Work</h2>
//       <table className="submissions-table">
//         <thead>
//           <tr>
//             <th>Student Name</th>
//             <th>Assignment Title</th>
//             <th>File</th>
//             <th>Submission Date</th>
//             <th>Download</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submissions.map((submission) => (
//             <tr key={submission._id}>
//               <td>{submission.studentName}</td>
//               <td>{submission.title}</td> {/* ✅ Fix: Changed assignmentTitle to title */}
//               <td>{submission.filePath}</td> {/* ✅ Fix: Changed file to filePath */}
//               <td>{new Date(submission.completedDate).toLocaleString()}</td> {/* ✅ Fix: Changed createdAt to completedDate */}
//               <td>
//                 <a 
//                   href={`http://localhost:5000/${submission.filePath}`} 
//                   download
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                 >
//                   📥 Download
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewSubmissions;







import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/submission/submitedwork")
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((error) => console.error("Error fetching submissions:", error));
  }, []);

  return (
    <div>
      {/* Internal CSS */}
      <style>{`
        nav {
          background: #333;
          color: white;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 15px;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 5px 10px;
          transition: 0.3s;
        }
        .nav-links a:hover {
          background: #555;
        }
        .home-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          font-size: 14px;
          cursor: pointer;
          border-radius: 5px;
        }
        .home-btn:hover {
          background: #0056b3;
        }
        .submissions-container {
          margin: 20px auto;
          width: 90%;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .submissions-table {
          width: 100%;
          border-collapse: collapse;
        }
        .submissions-table th {
          background: #333;
          color: white;
          padding: 10px;
          text-align: left;
        }
        .submissions-table td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .submissions-table tr:hover {
          background: #f1f1f1;
        }
      `}</style>

      {/* Navbar */}
      <nav>
        <div className="nav-container">
          <button className="home-btn" onClick={() => navigate("/")}>Go to Home Page</button>
        </div>
      </nav>

      {/* Submissions Table */}
      <div className="submissions-container">
        <h3>Submitted Work</h3>
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
                <td>{submission.title}</td>
                <td>{submission.filePath}</td>
                <td>{new Date(submission.completedDate).toLocaleString()}</td>
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
    </div>
  );
};

export default ViewSubmissions;
