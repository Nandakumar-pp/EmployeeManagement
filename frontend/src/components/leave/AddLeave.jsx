import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddLeave = () => {
  const { user } = useAuth();
  let sl=0
  let cl=0
  let al=0
  const [leave, setLeave] = useState({
    userId: user._id,
  });
  const location = useLocation();
  const [leaveDaysByType, setLeaveDaysByType] = useState(0);

  // Set totalLeaveDays from location state when the component is mounted
  useEffect(() => {
    console.log("Received location state:", location.state); // Log the location state
    if (location.state && location.state.leaveDaysByType !== undefined) {
      setLeaveDaysByType(location.state.leaveDaysByType);
    }
  }, [location]);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calculating the days based on the leave type
    if(leave.leaveType==="Sick Leave")
    {
      sl=(new Date(leave.endDate).getDate() -
      new Date(leave.startDate).getDate())
    }
    else if(leave.leaveType==="Casual Leave"){
      cl=(new Date(leave.endDate).getDate() -
      new Date(leave.startDate).getDate())
    }
    else{
    al=(new Date(leave.endDate).getDate() -
    new Date(leave.startDate).getDate())
    }


    if((sl>(10-leaveDaysByType.sickLeave)) || (cl>(10-leaveDaysByType.casualLeave)) || (al>(10-leaveDaysByType.annualLeave)))
    {
        alert("No of Days is more than the remaining Days")
    }
    else{
        try {
            const response = await axios.post(
              "http://localhost:5000/api/leave/add",
              leave,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.data.success) {
              navigate("/employee-dashboard/leaves");
            }
          } catch (error) {
            console.log("Error while adding leave:", error);
          }
    }
    
  };

  const remainingLeaveDays =(10 - (leaveDaysByType.casualLeave+leaveDaysByType.annualLeave+leaveDaysByType.sickLeave )) 
    // Calculate remaining leave days

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Leave Request</h2>
      <div className="flex justify-end">
      <div className="px-4 py-1 bg-teal-700 text-white rounded w-52">
        Remaining Leaves:<br/> sl:{10 - leaveDaysByType.sickLeave}  cl:{10-leaveDaysByType.casualLeave}  al:{10-leaveDaysByType.annualLeave}  
      </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label>Leave Type</label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sevillana text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-sevillana text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sevillana text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-300"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Leave Request
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
