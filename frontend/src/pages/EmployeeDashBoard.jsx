import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'
const EmployeeDashBoard=()=>{
    return(
        <div className='flex'>
        <Sidebar/>
       <div className='flex-1 ml-64 bg-gray-300 h-screen'>
         <Navbar/>
         <Outlet/>
       </div>
      
   </div>
    )

}
export default EmployeeDashBoard