import React, { useState } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../services/api'
import { toast } from 'react-toastify';
import Header from './Header';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    

    const { username, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()

    
        try {
            const response = await axios.post('https://tasks-api-yq7g.onrender.com/auth/register' + 'login', formData)
            if (response.status === 201) {
                localStorage.setItem('user', JSON.stringify(response.data))
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('_id', response.data._id)
                navigate("/circle");
            }
            toast(response.data);
            setIsLoading(false)
        } catch (error) {
            console.error(`EISHHHH  ---  ${error}`);
        }

    }


    
    if (isLoading) {
        return <Loading />
    }


  return (
    <div>
      <Header/>
      <form className="mt-8 space-y-6">
        <div className="-space-y-px">
        <input
        type="text"
        placeholder="Email"
      />
      <input
        type="password"
        placeholder="Password"
        
        value={password}
        
      />

          </div>
          </form>
      
      <button 
      className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'
      >Login</button>
    </div>
  );
}

export default LoginForm;
