import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { FaEnvelope, FaKey } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ Corrected handleChange function to update form data properly
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Moved API call to handleSubmit (not in handleChange)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // ✅ Important for authentication
      });
  
      const data = await response.json();
      console.log("Response:", response.status, data);
  
      if (response.ok) {
        toast.success("Login Successful!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(data.message || "Login Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network Error! Please try again.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {/* ✅ Ensure handleSubmit is used correctly */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i><FaEnvelope /></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}  // ✅ Controlled input
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <i><FaKey /></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}  // ✅ Controlled input
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
