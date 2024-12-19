import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmpLeaveTable = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [reply, setReply] = useState("");  // State to capture the rejection reason
  const [check, setCheck] = useState(false);  // Check for validation before submission
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status, reply) => {
    if (status === "Rejected" && reply === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

    // Update the check state to indicate validation success
    setCheck(true);

    if (check) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`,
          { status, reply }, // Send both status and reply (reason)
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data)
        if (response.data.success) {
          navigate('/admin-dashboard/leaves');
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);  // Update rejection reason as the user types
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-sevillana mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-72"
                alt="Profile"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">Name :</p>
                <p className="font-sevillana">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">Employee Id :</p>
                <p className="font-sevillana">{leave.employeeId.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">Designation :</p>
                <p className="font-sevillana">{leave.employeeId.designation}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">Leave Type :</p>
                <p className="font-sevillana">{leave.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">Reason :</p>
                <p className="font-sevillana">{leave.reason}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">Start Date :</p>
                <p className="font-sevillana">{new Date(leave.startDate).toDateString()}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">End Date :</p>
                <p className="font-sevillana">{new Date(leave.endDate).toDateString()}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">Reply :</p>
                <p className="font-sevillana">{leave.reply}</p>
              </div>
              <div className="flex space-x-3 mb-5 w-full h-10">
                <p className="text-lg font-sevillana font-semibold">
                  {leave.status === "Pending" ? (
                    <div>
                      <textarea
                        value={reply}
                        onChange={handleReplyChange}
                        placeholder="Enter reason for rejection"
                        className="w-full p-2 border border-gray-300 rounded"
                      ></textarea>
                    </div>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-sevillana font-semibold">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                  <div>
                    <div className="flex space-x-2">
                      <button
                        className="px-2 py-0.5 bg-teal-800 hover:bg-teal-900 text-white"
                        onClick={() => changeStatus(leave._id, "Approved", reply)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-2 py-0.5 bg-red-800 hover:bg-red-900 text-white"
                        onClick={() => changeStatus(leave._id, "Rejected", reply)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-sevillana">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
};

export default EmpLeaveTable;
