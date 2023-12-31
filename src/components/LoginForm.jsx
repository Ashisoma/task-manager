import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = "https://tasks-api-yq7g.onrender.com/auth/login";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jwtToken = response.data.accessToken;
      console.log("Login successful! JWT token:", jwtToken);
      // Save the JWT token in localStorage or state for future use
      localStorage.setItem("jwtToken", jwtToken);
      if (jwtToken) {
      
        navigate("/tasks");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle the registration error, possibly show an error message to the user
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-3 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-3xl font-bold text-blue-600">Sign In</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full mt-2 p-3 border-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4"></div>
            <div className="flex items-center justify-end mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/"
              >
                Not registered?
              </Link>
              <button
                type="submit"
                onClick={handleLogin}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
