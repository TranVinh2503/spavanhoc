import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Courses from "./pages/Courses/Courses";
import MyCourses from "./pages/MyCourses/MyCourses"
import CourseAccess from "./pages/CourseAccess/CourseAccess";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin"
import { AppProvider } from "./context/AppContext";
function App() {
  return (
    <AppProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/my_course" element={<MyCourses/>} />
          <Route path="/my_course/:id" element={<CourseAccess />} />
        </Routes>
      </div>
    </Router>
    </AppProvider>
  );
}

export default App;


