import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaLaptop, FaUsers } from 'react-icons/fa'
import NotificationBar from './NotificationBar'
import { Link } from 'react-router-dom'

const AdminSummary =()=>{
    return(
        <div className='p-6 space-y-10'>

           
             <h3 className='text-2xl font-sevillana'>Dashboard Overview</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                    <Link to="/admin-dashboard/employees">
                   
                    <SummaryCard icon={<FaUsers/>} text={"Employees"} number={"Click to view"} color="bg-teal-700"/>
                    </Link>  <SummaryCard icon={<FaBuilding/>} text={"Departments"} number={4} color="bg-yellow-700"/>
                    <SummaryCard icon={<FaLaptop/>} text={"Projects"} number={7} color="bg-red-700"/>
                </div>
                
         <div>
            <h4 className="flex justify-center text-2xl font-sevillana mb-4">Notifications</h4>
            <div className=''>
            <NotificationBar/>
            </div>
            
         </div>
        </div>
    )
}

export default AdminSummary