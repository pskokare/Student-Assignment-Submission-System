import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ViewSubmissions from "./pages/ViewSubmissions"; // ✅ Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TeacherDashboard/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view-submissions" element={<ViewSubmissions />} /> {/* ✅ New Route */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;
