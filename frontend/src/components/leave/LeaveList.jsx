import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveDaysByType, setLeaveDaysByType] = useState(0);
  
  const { user } = useAuth();
  const navigate = useNavigate(); // Use navigate to control redirection programmatically
  
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);
      
      if (response.data.success) {
        setLeaves(response.data.leaves);
        setLeaveDaysByType(response.data.leaveDaysByType); // Setting the total leave days
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };
  
  const handleClick = (e) => {
    // If remaining leave days are 0 or less, show an alert and do not navigate
    if ((10 - (leaveDaysByType.casualLeave+leaveDaysByType.annualLeave+leaveDaysByType.sickLeave )) <= 0) {
      e.preventDefault(); // Prevent navigation
      alert('You cannot Add a new Request as you have no remaining leaves!');
    } else {
      // Otherwise, allow navigation with state
      navigate('/employee-dashboard/add-leave', {
        state: { leaveDaysByType }
      });
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []); // Fetch leaves on component mount

  return (
    <div className="p-6">
      {/* Display the total leave days */}
      <div className="px-4 py-1 bg-teal-700 text-white rounded w-52">
        Remaining Leaves:<br/> sl:{10 - leaveDaysByType.sickLeave}  cl:{10-leaveDaysByType.casualLeave}  al:{10-leaveDaysByType.annualLeave}  
      </div>

      {/* Leave Section Title */}
      <div className="text-center">
        <h3 className="text-3xl font-sevillana">Leaves</h3>
      </div>

      {/* Search and Add Leave */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Date"
          className="px-4 py-0.5 border"
        />
        <button
          onClick={handleClick}
          className="px-4 py-1 bg-teal-700 text-white rounded"
        >
          Add Leave Request
        </button>
      </div>

      {/* Leave Table */}
      <div className="mt-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">S No</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Reply</th>

            </tr>
          </thead>
          <tbody>
            {leaves.slice().reverse().map((leave, index) => (
              <tr
                key={leave._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
                <td className="px-6 py-3">{leave.reply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
