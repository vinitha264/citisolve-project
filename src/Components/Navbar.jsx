import React from 'react'
import "./Navbar.css";
import {Link, useNavigate} from 'react-router-dom'
import { UseAuth } from '../Context/AuthContext'
const Navbar = () => {
  const auth=UseAuth()
  const navigate = useNavigate()
  function Logout(){
    auth.Logout()
    navigate("/")
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side - Logo */}
        <div className="navbar-left">

          <Link to="/" className="logo">
            CitiSolve
          </Link>
        </div>
        {auth.user&& auth.user.name ? <div>
          <Link to={'/complaintform'}>Submit Complaint</Link>
          <Link to={'/my-complaint'}>My Complaints</Link>
          <p>{auth.user.name}</p>
          <button onClick={Logout}>LOgout</button>
        </div>:
        <div>
          {/* Right side - Buttons */}
        <div className="navbar-right">
          <Link to="/login" className="nav-btn">
            Login
          </Link>
          <Link to="/register" className="nav-btn">
            Register
          </Link>
        </div>
          </div>}
      </div>
    </nav>
  );
};
export default Navbar;


