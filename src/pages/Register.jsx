import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../Context/AuthContext"; // ✅ check your file name (should match exactly)
import { authAPI } from "../services/API"; // ✅ make sure your API file is named correctly (API.js or api.js)

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
  });

  const navigate = useNavigate();
  const { login } = UseAuth();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ validate form before submit
  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      console.log("Registration successful:", response);

      // ✅ automatically log the user in (optional)
      login({
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="register-subtitle">Join our citizen resolution system</p>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          {/* Role */}
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              placeholder="Confirm your password"
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account?</p>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
