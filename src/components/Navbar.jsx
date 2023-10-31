import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate('/login')
  };
 

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Task Manager
        </Link>
        <ul className="flex space-x-4">
          {localStorage.getItem('jwtToken') ? (
            <>
              <li>
                <Link to="/tasks" className="text-white hover:underline">
                  Tasks
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:underline">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
