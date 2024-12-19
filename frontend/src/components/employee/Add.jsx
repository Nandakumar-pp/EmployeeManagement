import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Add=()=>{
    const[formData,setFormData]=useState({})
    const handleChange=(e)=>{
        const {name,value,files}=e.target 
        if(name==='image')
        {
            setFormData((prevData)=>({...prevData,[name]:files[0]}))
        }
        else{
            setFormData((prevData)=>({...prevData,[name]:value}))

        }
    }
    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const formDataObj=new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key])
        })
        try{
            const response=await axios.post("http://localhost:5000/api/employee/add",formDataObj,{
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
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{/*Name*/}
                    <div>
                        <label className='block text-sm font-sevillana text-gray-700'>
                            Name
                        </label>
                        <input
                        type="text"
                        name="name"
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
                        onChange={handleChange}
                        placeholder='Enter Email'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                    {/*Employee Id*/}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Employee ID
                        </label>
                        <input
                        type="text"
                        name="employeeId"
                        onChange={handleChange}
                        placeholder='Employee ID'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                    {/* Date of Joining */}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Date of Joining
                        </label>
                        <input
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        placeholder='Date of Joining'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                    {/* Gender*/ }
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Gender
                        </label>
                        <select
                        name="gender"
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>

                        </select>
                    </div>
                    {/* Marital status*/}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Marital Status
                        </label>
                        <select
                        name="maritalstatus"
                        onChange={handleChange}
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>


                        </select>
                    </div>
                    {/* Designation*/}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Designation
                        </label>
                        <input
                        type="text"
                        name="designation"
                        onChange={handleChange}
                        placeholder='Designation'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                   {/* phone no*/}
                   <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Phone No
                        </label>
                        <input
                        type="tel"
                        name="phno"
                        onChange={handleChange}
                        placeholder='Phone No'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                     {/*Salary */}
                     <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Salary
                        </label>
                        <input
                        type="number"
                        name="salary"
                        onChange={handleChange}
                        placeholder='Salary'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                    {/*Password */}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Password
                        </label>
                        <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder='*********'
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
                    {/*Image */}
                    <div>
                    <label className='block text-sm font-sevillana text-gray-700'>
                            Image
                        </label>
                        <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        placeholder='Upload Image'
                        accept='image/*'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        required
                        >
                        </input>
                    </div>
                </div>
                <button
                type="submit"
                className='w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded'
                >
                   Add Employee
                </button>
            </form>

        </div>
    );
};
export default Add;