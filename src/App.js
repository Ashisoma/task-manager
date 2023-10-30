import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskList from './components/TaskList';
import { BrowserRouter as Router, Routes, Route, Navigate, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import TaskDetails from './components/TaskDetail';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './Protected';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define a logout handler function
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  return (
    <>
      <Router>
        <div>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Routes>
            <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/:id" element={TaskDetails} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
