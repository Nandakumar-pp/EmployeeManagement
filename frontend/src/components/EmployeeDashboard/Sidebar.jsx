import React,{useState} from 'react'

import { NavLink } from 'react-router-dom'
import {FaBookmark, FaBuilding, FaCalendar, FaCalendarDay, FaCalendarWeek, FaFlag,FaHistory,FaLaptop, FaMoneyBill, FaSlidersH, FaUsers} from 'react-icons/fa'
import { useAuth } from '../../context/authContext'
const Sidebar=()=>{
   
   const {user}=useAuth()
    return(
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className='bg-teal-700 h-12 flex items-center justify-center'>
                <h3 className="text-2xl text-center font-sevillana">Innovin Labs</h3>
                
            </div>
            <div className="px-4">
                
                <NavLink to={"/employee-dashboard"}
                className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaBookmark className="text-xl"/>
                    <span>DashBoard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`} className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaUsers/>
                    <span>Profile</span>
                </NavLink>

                <NavLink to="/employee-dashboard/projects" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaLaptop/>
                    <span>Projects</span>
                </NavLink>
                
                <NavLink to={`/employee-dashboard/salary/${user._id}`} className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaHistory/>
                    <span>Salary History</span>
                </NavLink>
                
                <NavLink to={"/employee-dashboard/leaves"} className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaCalendarDay/>
                    <span>Leaves</span>
                </NavLink>
                <NavLink to="/employee-dashboard/settings" className="flex items-center space-x-4 block py-2.5 px-4 rounded">
                    <FaSlidersH/>
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )

}
export default Sidebar