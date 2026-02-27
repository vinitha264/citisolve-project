/*import React, { useState, useEffect } from "react";
import "./MyComplaint.css";
import { useNavigate } from "react-router-dom";

const MyComplaint = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);

  return (
    <div className="complaint-container">
      <div className="complaint-header">
        <h2>My Complaints</h2>
        <button onClick={() => navigate("/complaintform")} className="add-btn">
          + Add Complaint
        </button>
      </div>

      <div className="complaint-list">
        {complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          complaints.map((complaint, index) => (
            <div key={index} className="complaint-card">
              <div className="card-top">
                <h3>{complaint.category}</h3>
                <span className="status Pending">Pending</span>
              </div>

              <p className="location">📍 {complaint.location}</p>
              <p className="description">{complaint.description}</p>
              <p className="date">Filed on: {complaint.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyComplaint;*/


import React, { useState, useEffect } from "react";
import "./MyComplaint.css";
import { useNavigate } from "react-router-dom";

const MyComplaint = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  // Load complaints from localStorage on mount
  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);

  // Delete complaint by index
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      const updatedComplaints = complaints.filter((_, i) => i !== index);
      setComplaints(updatedComplaints);
      localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
    }
  };

  return (
    <div className="complaint-container">
      <div className="complaint-header">
        <h2>My Complaints</h2>
        <button onClick={() => navigate("/complaintform")} className="add-btn">
          + Add Complaint
        </button>
      </div>

      <div className="complaint-list">
        {complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          complaints.map((complaint, index) => (
            <div key={index} className="complaint-card">
              <div className="card-top">
                <h3>{complaint.category}</h3>
                <span className="status Pending">Pending</span>
              </div>

              <p className="location">📍 {complaint.location}</p>
              <p className="description">{complaint.description}</p>
              <p className="date">Filed on: {complaint.date}</p>

              {/* Delete button */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyComplaint;