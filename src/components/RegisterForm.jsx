// src/components/RegisterForm.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [data, setData] = useState({
    username: "",
    password: "",
    password2: "",
  });


  const handleChange = (name) => (e) => {
    let value;
 
   
      value = e.target.value;
    
    setData({ ...data, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (data.password !== data.password2) {
      setIsLoading(false);
      toast.info("Passwords do not match");
    } else if (data.password.length < 8) {
      setIsLoading(false);
      toast("Password must be at least 8 characters long");
    } else {
      let formData = new FormData();
      formData.append("username", data.username.trim());
      formData.append("password", data.password);

      try {
        const response = await axios.post('https://tasks-api-yq7g.onrender.com/auth/register', formData);

        if (response.status === 201) {
          setData({
            username: "",
            password: "",
            password2: "",
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("_id", response.data._id);
        } else {
          setIsLoading(false);
        }

        toast(response.data);
      } catch (error) {
        console.log(error.message);
        toast(`EISHHHH  ---  ${error}`);
      }
    }
  };


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }


  return (
    <section className="signUp">
      <div className="titleDiv">
        <h2>Sign Up</h2>
        <hr />
      </div>

      <form>
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          value={data.username}
          onChange={handleChange("username")}
          required
        />

    

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={handleChange("password")}
          required
        />

        <input
          type="password"
          name="password2"
          placeholder="Confirm your password"
          value={data.password2}
          onChange={handleChange("password2")}
          required
        />

       
      

        <button onClick={handleRegister}>
          SUBMIT 
        </button>
      </form>

      <p id="toLogin">
        Have you taken signed up already?
        <Link to="/login"> Log in</Link>
      </p>
    </section>
  );
}

export default RegisterForm;
