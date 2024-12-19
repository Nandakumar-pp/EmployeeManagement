import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
const Edit=()=>{
    const[employee,setEmployee]=useState({
        name:'',
        email:'',
        designation:'',
        employeeId:'',
        role:''
    });
    const { id } = useParams();
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
                    const employee=response.data.employee
                  setEmployee((prev)=>({...prev,name:employee.userId.name,
                    email:employee.userId.email,
                    employeeId:employee.employeeId,
                    designation:employee.designation,
                    salary:employee.salary,
                    role:employee.userId.role}))
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
    const handleChange=(e)=>{
        const {name,value}=e.target 
        
            setEmployee((prevData)=>({...prevData,[name]:value}))

        
    }
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
       
        try{
            const response=await axios.put(`http://localhost:5000/api/employee/${id}`,employee,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            
            if(response.data.success){
                navigate("/admin-dashboard/employees");
            }

        }catch(error){
            console.error(error);
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }

        }

    };
    return(
        <>{employee ? (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-sevillana text-gray-700'>
                            Name
                        </label>
                        <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        placeholder='Enter Name'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        ></input>
                        
                    </div>
                    {/* Email*/}
                    <div>
                        <label className='block text-sm font-sevillana text-gray-700'>
                            Email
                        </label>
                        <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        placeholder='Enter Email'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                  
                    
                   
                    {/* Designation*/}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Designation
                        </label>
                        <input
                        type="text"
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                        placeholder='Designation'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                  
                     {/*Employee_Id */}
                     <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Employee_Id
                        </label>
                        <input
                        type="text"
                        name="employeeId"
                        value={employee.employeeId}
                        onChange={handleChange}
                        placeholder='Employee_Id'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                    
                    {/*Role */}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Role
                        </label>
                        <select
                        name="role"
                        value={employee.role}
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="hr">HR</option>
                            <option value="employee">Employee</option>

                        </select>
                    </div>
                   
                </div>
                <button
                type="submit"
                className='w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded'
                >
                   Submit
                </button>
            </form>

        </div>
        ): <div> Loading...</div>}</>
    );
};
export default Edit;