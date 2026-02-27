
import React, { useState } from "react";
import "./ComplaintForm.css";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ward: "",
    location: "",
    category: "",
    description: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handlePhotoChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File too large. Please upload under 5MB.");
      return;
    }

    setFormData({ ...formData, photo: selectedFile });
  }

  function validateForm() {
    const newError = {};

    if (!formData.name.trim()) newError.name = "Name is required";
    if (!formData.ward.trim()) newError.ward = "Ward is required";
    if (!formData.location.trim()) newError.location = "Location is required";
    if (!formData.category.trim()) newError.category = "Category is required";

    if (!formData.description.trim()) {
      newError.description = "Description is required";
    } else if (formData.description.length < 10) {
      newError.description = "Minimum 10 characters required";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const newComplaint = {
      ...formData,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    const existingComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const updatedComplaints = [...existingComplaints, newComplaint];

    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));

    alert("Complaint Submitted Successfully!");

    navigate("/my-complaint");
  }

  return (
    <div className="complaint-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Submit a Complaint</h1>

        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Ward:</label>
        <input type="text" name="ward" onChange={handleChange} />
        {errors.ward && <p className="error">{errors.ward}</p>}

        <label>Location:</label>
        <input type="text" name="location" onChange={handleChange} />
        {errors.location && <p className="error">{errors.location}</p>}

        <label>Category:</label>
        <input type="text" name="category" onChange={handleChange} />
        {errors.category && <p className="error">{errors.category}</p>}

        <label>Description:</label>
        <textarea name="description" onChange={handleChange}></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        <label>Photo (optional):</label>
        <input
          type="file"
          accept="image/*"
          name="photo"
          onChange={handlePhotoChange}
        />

        <div className="button-group">
          <button type="button" onClick={() => navigate("/my-complaint")}>
            Cancel
          </button>
          <button type="submit">Submit Complaint</button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;