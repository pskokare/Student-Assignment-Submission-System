// import { useState } from "react";
// import axios from "axios";
// import "./TeacherAssignment.css"; // New CSS file to avoid conflicts
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
// import { useNavigate } from "react-router-dom";

// const TeacherDashboard = () => {
//   const [title, setTitle] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const newAssignment = { title, dueDate, description };
//       await axios.post("http://localhost:5000/api/assignments/assign", newAssignment);

//       toast.success("Assignment posted successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       // Clear form fields
//       setTitle("");
//       setDueDate("");
//       setDescription("");
//     } catch (err) {
//       setError("Error posting assignment. Try again.");
//       toast.error("Error posting assignment!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div class="form-wrapper">
//     <div className="teacher-assignment-container">
//       <h1 className="teacher-heading">Teacher Dashboard</h1>

//       {/* Simple Assignment Form */}
//       <div className="assignment-form-box">
//         <h2 className="form-title">Post Assignment</h2>
//         {error && <p className="form-error">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <label className="form-label">Title:</label>
//           <input
//             type="text"
//             className="form-input"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <label className="form-label">Due Date:</label>
//           <input
//             type="date"
//             className="form-input"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             required
//           />

//           <label className="form-label">Description:</label>
//           <textarea
//             className="form-textarea"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>

//           <button type="submit" disabled={loading} className="post-btn">
//             {loading ? "Posting..." : "Assign work"}
//           </button>

//            {/* View Submissions Button */}
//         <button type="button" className="submissions-btn" onClick={() => navigate("/view-submissions")}>
//           View Submissions
//         </button>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default TeacherDashboard;


import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const TeacherDashboard = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ State for success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage(""); // Reset success message

    try {
      const newAssignment = { title, dueDate, description };
      await axios.post("http://localhost:5000/api/assignments/assign", newAssignment);

      toast.success("Assignment posted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTitle("");
      setDueDate("");
      setDescription("");

      // ✅ Show success message for 2 seconds
      setSuccessMessage("Sending work successfully...");
      setTimeout(() => {
        setSuccessMessage(""); // Hide message after 2 seconds
      }, 2000);

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
        .nav-left {
          display: flex;
          align-items: center;
        }
        .nav-left img {
          width: 40px;
          height: auto;
          margin-right: 10px;
        }
        .nav-left span {
          font-size: 14px;
          font-weight: 500;
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
        .container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .form-box {
          width: 50%;
          padding: 20px;
          background: #f4f4f4;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .error-text {
          color: red;
          text-align: center;
        }
        .success-message {
          color: green;
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input, textarea {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .button-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }
        button {
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 45%;
        }
        .submit-btn {
          background: #28a745;
          color: white;
        }
        .submit-btn:disabled {
          background: #aaa;
        }
        .view-btn {
          background: #007bff;
          color: white;
        }
      `}</style>

      {/* Navbar */}
      <nav>
        <div className="nav-container">
          {/* Left side: Logo and text */}
          <div className="nav-left">
            <img src="images/panini.png" alt="Panini Logo" />
            <span>Panini Educational Ventures Pvt. Ltd.</span>
          </div>

          {/* Right side: Links */}
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/view-submissions">View Submissions</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Form Section */}
      <div className="container">
        <div className="form-box">
          {error && <p className="error-text">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>} {/* ✅ Success message */}

          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            {/* Buttons in a single row */}
            <div className="button-container">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Posting..." : "Assign Work"}
              </button>

              <button type="button" className="view-btn" onClick={() => navigate("/view-submissions")}>
                View Submissions
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
