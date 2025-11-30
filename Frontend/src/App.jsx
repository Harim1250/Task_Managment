import Navbar from "./components/Navbar.jsx";
import ToDoList from "./components/ToDoList.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ToDoList />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
};

export default App;