import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import "./Register.css"; // Import CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/students/register", { // Update API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); 
      console.log("Response Status:", response.status); 
      console.log("Response Data:", data); 
  
      if (response.ok) {
        toast.success("Registration Successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Registration Failed!"); 
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network Error! Please try again.");
    }
  };
  
  

  return (
    <div className="register-container">
      <ToastContainer /> {/* Toast Notification Container */}
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
