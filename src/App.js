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
import NewTask from './components/NewTask';

function App() {


  // Define a logout handler function


 

  return (
    <>
      <Router>
        <div>
          <Navbar  />
          <Routes>
            <Route path="/login" element={<LoginForm  />}/>
            <Route path="/register" element={<RegisterForm  />} />
            <Route path="/" element={<LoginForm />} />

            <Route path='/tasks'
              element={
              <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              }
            />
            <Route path='/tasks/:taskId'
              element={
                <ProtectedRoute>
                  <TaskDetails />
                </ProtectedRoute>
              }
            />
            <Route path='/tasks/add'
              element={
                <ProtectedRoute>
                  <NewTask />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/tasks/add" element={<NewTask />} isAuthenticated={isAuthenticated} /> */}
            {/* <Route path="/tasks/:taskId" element={<TaskDetails/>} isAuthenticated={isAuthenticated}/> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
