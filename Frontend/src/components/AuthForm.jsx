import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/login`,
          formData
        );
        login(response.data.token); // Call login to update isAuthenticated
        toast.success("Login successful! Redirecting to your tasks...");
        navigate("/"); // Redirect to ToDoList
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, formData);
        toast.success("Signup successful! Redirecting to login...");
        setIsLogin(true); // Switch to login after successful signup
      }
    } catch (error) {
      toast.error(
        isLogin ? "Login failed. Please check your credentials." : "Signup failed. Please try again."
      );
      console.error(isLogin ? "Login failed" : "Signup failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold">{isLogin ? "Login" : "Signup"}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className={`w-full ${
            isLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
          } text-white p-2 rounded`}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;