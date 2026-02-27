import React, { useState } from 'react'
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {


  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));


    setErrors(prev=>({
      ...prev,[e.target.name]:""
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!loginData.email.trim()) newErrors.email = "Email is required";
    else if (!loginData.email.includes("@")) newErrors.email = "Invalid email format";

    if (!loginData.password) newErrors.password = "Password is required";
    else if (loginData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);
    if(Object.keys(newErrors).length===0){
    navigate("/my-complaint")
    }
  }


  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to our page</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              onChange={handleChange}
              className="form-input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              onChange={handleChange}
              className="form-input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="button-container">
            <button type='submit' className="login-btn">Login</button>
          </div>

          <p className="register-text">
            Don’t have an account? <Link to='/register' className="register-link">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login