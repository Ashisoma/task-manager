import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskList from './components/TaskList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<RegisterForm />} />
        <Route path='/tasks' element={<TaskList />} />
        <Route path='/login' element={<LoginForm />} />
       
      </Routes>
    </Router>
    <ToastContainer />
  </>
  );
}

export default App;
