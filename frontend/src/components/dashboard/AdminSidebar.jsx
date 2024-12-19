import React,{useState} from 'react'

import { NavLink } from 'react-router-dom'
import {FaBookmark, FaBuilding, FaCalendar, FaCalendarDay, FaCalendarWeek, FaFlag,FaHistory,FaLaptop, FaMoneyBill, FaSlidersH, FaUsers} from 'react-icons/fa'
const AdminSidebar=()=>{
   
   
    return(
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className='bg-teal-700 h-12 flex items-center justify-center'>
                <h3 className="text-2xl text-center font-sevillana">Innovin Labs</h3>
                
            </div>
            <div className="px-4">
                
                <NavLink to="/admin-dashboard" 
                className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaBookmark className="text-xl"/>
                    <span>DashBoard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaUsers/>
                    <span>Employee</span>
                </NavLink>
                {/* <NavLink to="/admin-dashboard/departments" 
                className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaBuilding/>
                    <span>Departments</span>
                </NavLink>
                <NavLink to="/admin-dashboard" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaLaptop/>
                    <span>Projects</span>
                </NavLink> */}
                
                <NavLink to="/admin-dashboard/salary" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaMoneyBill/>
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/admin-dashboard/payment" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaHistory/>
                    <span>Payment History</span>
                </NavLink>
                <NavLink to="/admin-dashboard/leaves" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaCalendar/>
                    <span>Leaves</span>
                </NavLink>
                <NavLink to="/admin-dashboard/attendance" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaCalendar/>
                    <span>Attendance</span>
                </NavLink>
                <NavLink to="/admin-dashboard/settings" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaSlidersH/>
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )

}
export default AdminSidebar