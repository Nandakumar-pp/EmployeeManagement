import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { DeleteEmployee, EditEmployee } from '../../utils/EmployeeHelper'
const Profile=()=>{
  const [employee,setEmployee]=useState(null)
  const {id}=useParams()
  // const handleClick=()=>{
  //   const navigate=useNavigate
  //   const {id}=useParams()
  //   //navigate(`/admin-dashboard/employees/edit/${id}`)
  // }
    
    
    useEffect(() => {
      // if (!id) {
      //     // If id is not available, exit early to avoid making an invalid request
      //     console.log("Employee ID is not available");
      //     return;
      // }

      const fetchEmployee = async () => {
          try {
              // Log id to ensure it's correct before making the request
              console.log("Fetching employee with id:", id);

              const response = await axios.get(
                  `http://localhost:5000/api/employee/${id}`,
                  {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                  }
              );

              if (response.data.success) {
                  setEmployee(response.data.employee);
              } else {
                  alert("Failed to fetch employee data");
              }
          } catch (error) {
              // Log detailed error information
              console.error("Error fetching employee:", error);

              if (error.response && !error.response.data.success) {
                  alert(error.response.data.error);
              } else {
                  alert("Server error occurred while fetching employee data.");
              }
          }
      };

      fetchEmployee();
  }, [id]);  // Add 'id' to the dependency array to trigger re-fetch on ID change

  if (!employee) {
      return <div>Loading...</div>;
  }
    return(
        <>{employee ?(
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'> 
        <h2 className='text-2xl font-sevillana mb-8 text-center'>Profile</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
                <img  src={`http://localhost:5000/${employee.userId.profileImage}`}
                className='rounded-full border w-72 border-2 border-teal-700 object-cover' ></img>
            </div>
            <div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana font-semibold'>Name :</p>
                <p className='font-sevillana'>  {employee.userId.name.charAt(0).toUpperCase() + employee.userId.name.slice(1).toLowerCase()}
                </p>

              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana font-semibold'>Email :</p>
                <p className='font-sevillana'>{employee.userId.email}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana font-semibold'>Employee Id :</p>
                <p className='font-sevillana'>{employee.employeeId}</p>

              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana font-semibold' >Date of Joining :</p>
                <p className='font-sevillana'>{new Date(employee.dob).toDateString()}</p>

              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana font-semibold'>Gender :</p>
                <p className='font-sevillana'>  {employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1).toLowerCase()}
</p>

              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana font-semibold'>Role :</p>
                <p className='font-sevillana'>  {employee.userId.role.charAt(0).toUpperCase() + employee.userId.role.slice(1).toLowerCase()}
                </p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana font-semibold'>Designation :</p>
                <p className='font-sevillana'>  {employee.designation.charAt(0).toUpperCase() + employee.designation.slice(1).toLowerCase()}
                </p>
              </div>
              {/* <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-sevillana'>Salary :</p>
                <p className='font-sevillana'>{(employee.salary * 1.0).toFixed(2)}</p>
              </div> */}
              
            </div>
        </div>
        <center>
          
            <div className='flex items-center justify-between '>
                {/* <button className='px-20 py-1 bg-teal-700 text-white' 
                onClick={handleClick(id)}
                >
                Edit 
              </button>
              <button className='px-20 py-1 bg-red-800 text-white' >
                Delete
              </button> */}
            {/* <EditEmployee Id={employee._id}/>
              <DeleteEmployee Id={employee._id}/> */}
            </div>
        </center>
        
        </div>
        
        ):<div>Loading....</div>}</>
    )
}
export default Profile