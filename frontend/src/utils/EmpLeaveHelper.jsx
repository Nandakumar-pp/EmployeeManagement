import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const columns=[
    {
        name:"S No",
        selector:(row)=>row.sno,
        width:"80px",
        sortable:true,
        center:"true"

    },
    
    {
        name:"Leave Type",
        selector: (row) => row.leaveType,
        sortable:true,
        width:"140px",
        center:"true"
    },
    {
        name:"Reason",
        selector: (row) => row.reason,
        sortable:true,
        width:"240px",
        center:"true"
    },
    {
        name:"Days",
        selector:(row)=>row.days,
        sortable:true,
        width:"80px",
        center:"true"
    },
    {
        name:"Status",
        selector:(row)=>row.status,
        sortable:true,
        width:"120px",
        center:"true"
    },
    {
        name:"Action",
        selector:(row)=>row.action,
        center:"true"
    }



];

export const LeaveButtons=({Id})=>{
    const navigate=useNavigate()

    const handleView=(id)=>{
        navigate(`/admin-dashboard/leaves/${id}`)
    }
    return(
        <button
        className='px-4 py-1 bg-teal-700 rounded text-white hover:bg-teal-800'
        onClick={()=>handleView(Id)}
        >
            View
        </button>
    )
}