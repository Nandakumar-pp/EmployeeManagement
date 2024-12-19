import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { columns} from '../../utils/PaymentHelper'
const Payment=()=>{
    const [salaries,setSalaries]=useState([])
    const [salaryLoading,setSalaryLoading]=useState(false)
    const [filteredSalary,setFilteredSalary]=useState([])

    // const onEmployeeDelete=async(id)=>{
    //     const data=employees.filter(emp=>emp._id!==id)
    //     setEmployees(data)
    // }

    useEffect(()=>{
        const fetchSalaries=async()=>{
            setSalaryLoading(true)
            try{
                const response=await axios.get("http://localhost:5000/api/salary",
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                console.log(response.data)
                if(response.data.success){
                    let sno=1;
                    const data=await response.data.salaries.map((s)=>({
                        _id:s._id,
                        sno:sno++,
                        bs:s.basicSalary,
                        al:s.allowances,
                        tax:s.deductions,
                        total:s.netsalary,
                        pdate:new Date(s.payDate).toLocaleDateString(),
                        employeeId:s.employeeId.employeeId,
                        //action:<PaymentButtons Id={s._id} />
                       
                    }));
                    setSalaries(data);
                    setFilteredSalary(data)
                    
                }
            }catch(error)
        
            {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }finally{
                setSalaryLoading(false)
            }

        };
        fetchSalaries();
    },[]);
    const handleFilter=(e)=>{
        const records=salaries.filter((s)=>(
            s.pdate.toLowerCase().includes(e.target.value.toLowerCase())
        )
        )
        setFilteredSalary(records)
    }
    return(
        <div className='p-6'> 
             <div className="text-center">
                <h3 className="text-3xl font-Sevillana">Complete Payment History</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Search By Date'
                onChange={handleFilter}
                className='px-4 py-0.5 border'/>
                {/* <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-700 text-white rounded"> 
                Add New Employee</Link> */}
            </div>
            <div className='mt-6'>
                <DataTable columns={columns} data={filteredSalary} pagination/>
            </div>
        
        
        </div>
    )
}
export default Payment