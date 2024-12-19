import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(null)
    const {login}=useAuth()
    const navigate=useNavigate()
    const {user,loading}=useAuth()
    const handleForgotClick = () => {
        navigate('/forgot-password');
    };
    
    //  useEffect(()=>{
    //       if(user)
    //       {
    //          navigate('/admin-dashboard')
    //       }
         
    //   },[user])
    const handleSubmit= async(e)=>{
       
        e.preventDefault();
        
        try {
            const response=await axios.post("http://localhost:5000/api/auth/login",{email,password});
            if(response.data.token){
               login(response.data.user)
               localStorage.setItem('token',response.data.token)
               if(response.data.user.role==="admin")
               {
                  navigate('/admin-dashboard')
               }
               else if(response.data.user.role==="hr"){
                
               }
               else if(response.data.user.role==="employee"){
                navigate('/employee-dashboard')
               }
               else{

               }

            }
        } catch (error) {
            if(error.response && !error.response.data.success)
            {
            setError(error.response.data.error)
            
           }else{
            setError("Server Error")
           }

    }
};
    return(
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-700 from-50%
        to-gray-300 to-50% space-y-6"
        >
            <h1 className="font-sevillana text-3xl text-white">
                Innovin Labs</h1>
                <div className="border shadow p-6 w-80 bg-white">
                    <h2 className="text-2xl font-bold mb-4">
                        Login</h2>
                    <center>{error && <p className="text-red-500">{error} </p>}</center>
                     <form onSubmit={handleSubmit}>
                
                        <div className="mb-4">
                             <label htmlFor="email" className="block text-gray-700">
                                Email</label>
                                <input type="email" 
                                className="w-full px-3 py-2 border"
                                placeholder='Enter Email'
                                onChange={(e)=>setEmail(e.target.value)}
                                required></input>
                
                        </div>
    
                        <div>
         
                            <label htmlFor="password" className="block text-gray-700">
                                Password</label>
                            <input type="password" 
                            className="w-full px-3 py-2 border"
                            placeholder='*********'
                            onChange={(e)=>setPassword(e.target.value)}
                            required></input>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="from-checkbox"/>
                                <span className="ml-2 text-gray-700">Remember Me</span>

                            </label>
                            <button onClick={handleForgotClick} className="text-teal-600">
                                    Forgot Password?
                            </button>

                        </div>
                        <div className="mb-4">
                            <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2"
                            >Login</button>

                        </div>
                    </form>
                </div>

         </div>
    )

}
export default Login