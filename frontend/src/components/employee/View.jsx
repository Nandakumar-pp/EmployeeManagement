import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { DeleteEmployee, EditEmployee } from '../../utils/EmployeeHelper'
const View=()=>{
  const handleClick=()=>{
    const navigate=useNavigate
    const {id}=useParams()
    navigate(`/admin-dashboard/employees/edit/${id}`)
  }
    const {id}=useParams()
    const [employee,setEmployee]=useState(null)
    useEffect(()=>{
        const fetchEmployee=async()=>{
            try{
                const response=await axios.get(
                    `http://localhost:5000/api/employee/${id}`,
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if(response.data.success)
                {
                  setEmployee(response.data.employee)
                }
            }catch(error)
            {
               if(error.response && !error.response.data.success){
                alert(error.response.data.error)
               }
            }
        };
        fetchEmployee();
    },[]);
    return(
        <>{employee ?(
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'> 
        <h2 className='text-2xl font-sevillana mb-8 text-center'>Employee Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
                <img  src={`http://localhost:5000/${employee.userId.profileImage}`}
                className='rounded-full border w-72' ></img>
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
              <EditEmployee Id={employee._id}/>
              <DeleteEmployee Id={employee._id}/>
            </div>
        </center>
        
        </div>
        
        ):<div>Loading....</div>}</>
    )
}
export default View