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
        name:"Employee ID",
        selector: (row) => {
         
            return row.employeeId;
        },
        sortable:true,
        width:"150px",
        center:"true"
    },
    {
        name:"Basic Salary",
        selector:(row)=>row.bs,
        width:"150px",
        center:"true"
    },
    {
        name:"Allowances",
        selector:(row)=>row.al,
        width:"150px",
        center:"true"
    },
    {
        name:"Tax",
        selector:(row)=>row.tax,
        width:"90px",
        center:"true"
    },
    {
        name:"Total Salary",
        selector:(row)=>row.total,
        width:"150px",
        center:"true"
    },
    {
        name:"Pay Date",
        selector:(row)=>row.pdate,
        sortable:true,
        width:"150px",
        center:"true"
    },
    
    


];