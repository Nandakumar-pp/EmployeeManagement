import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
const List=()=>{
    const [employees,setEmployees]=useState([])
    const [empLoading,setEmpLoading]=useState(false)
    const [filteredEmployee,setFilteredEmployee]=useState([])

    const onEmployeeDelete=async(id)=>{
        const data=employees.filter(emp=>emp._id!==id)
        setEmployees(data)
    }

    useEffect(()=>{
        const fetchEmployees=async()=>{
            setEmpLoading(true)
            try{
                const response=await axios.get("http://localhost:5000/api/employee",
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                console.log(response.data)
                if(response.data.success){
                    let sno=1;
                    const data=await response.data.employees.map((emp)=>({
                        _id:emp._id,
                        sno:sno++,
                        name:emp.userId.name,
                        dob:new Date(emp.dob).toDateString(),
                        employeeId:emp.employeeId,
                        role:emp.userId.role,
                        profileImage:<img width={40} className='rounded-full' src={`http://localhost:5000/${emp.userId.profileImage}`}/>,
                        action:(<EmployeeButtons Id={emp._id} onEmployeeDelete={onEmployeeDelete}/>),
                    }));
                    setEmployees(data);
                    setFilteredEmployee(data)
                    
                }
            }catch(error)
        
            {
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }finally{
                setEmpLoading(false)
            }

        };
        fetchEmployees();
    },[]);
    const handleFilter=(e)=>{
        const records=employees.filter((emp)=>(
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        )
        setFilteredEmployee(records)
    }
    return(
        <div className='p-6'> 
             <div className="text-center">
                <h3 className="text-3xl font-sevillana">Manage Employee</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='Search By Name'
                onChange={handleFilter}
                className='px-4 py-0.5 border'/>
                <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-700 text-white rounded"> 
                Add New Employee</Link>
            </div>
            <div className='mt-6'>
                <DataTable columns={columns} data={filteredEmployee} pagination/>
            </div>
        
        
        </div>
    )
}
export default List