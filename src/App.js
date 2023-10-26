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
        {/* <Route path='/circle' element={<Circle />} /> */}
        <Route path='/login' element={<LoginForm />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
        {/* <Route path='/edit' element={<Edit />} /> */}
      </Routes>
    </Router>
    <ToastContainer />
  </>
  );
}

export default App;
