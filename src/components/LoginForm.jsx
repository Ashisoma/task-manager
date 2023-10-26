import React, { useState } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "./Header";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tasks-api-yq7g.onrender.com/auth/login",
        formData
      );
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("_id", response.data._id);
        navigate("/");
      }
      toast(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(`EISHHHH  ---  ${error}`);
    }
  };

 

  return (
    <div>
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">Task App </h1>
      <div>
        <a href="/">
          <h3 className="text-3xl font-bold text-blue-600">Sign Up</h3>
        </a>
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <form onSubmit={handleRegister}>
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
          <div className="mt-4">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Confirm Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password2"
                className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <Link></Link>
            <a
              className="text-sm text-gray-600 underline hover:text-gray-900"
              href="#"
            >
              Already registered?
            </a>
            <button
              type="submit"
              onClick={handleRegister}
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default LoginForm;
