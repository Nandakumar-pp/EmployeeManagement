import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/EmpLeaveHelper";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmpLeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/emp/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            console.log("hai")
            if (response.data.success) {
                const fetchedLeaves = response.data.leaves.map((leave, index) => ({
                    _id: leave._id,
                    sno: index + 1,
                    leaveType: leave.leaveType,
                    reason: leave.reason,
                    days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />,
                   // name: leave.employeeId.userId.name, // Adding the name to the leave data
                }));
                setLeaves(fetchedLeaves);
                setFilteredLeaves(fetchedLeaves);
            }
        } catch (error) {
            console.error("Error fetching leaves:", error);
            alert("Something went wrong while fetching the leaves. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [id]);

    const filterByInput = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const data = leaves.filter((leave) =>
            leave.name.toLowerCase().includes(searchValue)
        );
        setFilteredLeaves(data); // Directly update state if there is a change
    };

    const filterByButton = (status) => {
        const data = leaves.filter((leave) =>
            leave.status.toLowerCase().includes(status.toLowerCase())
        );
        setFilteredLeaves(data); // Directly update state if there is a change
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div> // Add a loading spinner or visual cue here
            ) : filteredLeaves.length > 0 ? (
                <div className="p-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-sevillana">Manage Leaves</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="Search By Name"
                            className="px-4 py-0.5 border"
                            onChange={filterByInput}
                        />
                        <div className="space-x-3">
                            <button
                                className="px-2 py-1 bg-yellow-800 text-white hover:bg-yellow-900"
                                onClick={() => filterByButton("Pending")}
                            >
                                Pending
                            </button>
                            <button
                                className="px-2 py-1 bg-teal-800 text-white hover:bg-teal-900"
                                onClick={() => filterByButton("Approved")}
                            >
                                Approved
                            </button>
                            <button
                                className="px-2 py-1 bg-red-800 text-white hover:bg-red-900"
                                onClick={() => filterByButton("Rejected")}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <DataTable columns={columns} data={filteredLeaves} pagination />
                    </div>
                </div>
            ) : (
                <div>No leaves available.</div>
            )}
        </>
    );
};

export default EmpLeaveList;
