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
        name:"Name",
        selector: (row) => {
            // Capitalize the first letter of the name
            return row.name.charAt(0).toUpperCase() + row.name.slice(1).toLowerCase();
        },
        sortable:true,
        width:"150px",
        center:"true"
    },
    {
        name:"Image",
        selector:(row)=>row.profileImage,
        width:"90px",
        center:"true"
    },
    {
        name:"Employee ID",
        selector:(row)=>row.employeeId,
        width:"130px",
        center:"true"
    },
    {
        name:"Role",
        selector: (row) => {
            // Capitalize the first letter of the name
            return row.role.charAt(0).toUpperCase() + row.role.slice(1).toLowerCase();
        },
        sortable:true,
        width:"120px",
        center:"true"
    },
    {
        name:"Joined Date",
        selector:(row)=>row.dob,
        sortable:true,
        width:"130px",
        center:"true"
    },
    {
        name:"Action",
        selector:(row)=>row.action,
        center:"true"
    }



];

// export const fetchEmployees=async()=>{
//     let employees;
//     try {
//         const response=await axios.get("http://localhost:5000/api/employee",{
//             headers:{
//                 Authorization:`Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//         if(response.data.success){
//             employees=response.data.employees
//         }
//     } catch (error) {
//         if(error.response && !error.response.data.success){
//             alert(error.response.data.error);
//         }
//     }
//     return employees
// };

// employees for  Adding salary

// export const getEmployees=async(id)=>{
//     let employees;
//     try {
//         const response=await axios.get(`http://localhost:5000/api/employee/salary/${id}`,{
//             headers:{
//                 Authorization:`Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//         if(response.data.success){
//             employees=response.data.employees
//         }
//     } catch (error) {
//         if(error.response && !error.response.data.success){
//             alert(error.response.data.error);
//         }
//     }
//     return employees
// };
export const EditSalary=({Id})=>{
    const navigate=useNavigate();
    // const handleDelete=async(id)=>{
    //     const confirm=window.confirm("Do you want to Delete ?");
    //     if(confirm)
    //     {
    //         try {
    //             const response=await axios.delete(`http://localhost:5000/api/employee/${id}`,
    //                 {
    //                     headers:{
    //                         Authorization:`Bearer ${localStorage.getItem("token")}`,
    //                     },
    //                 }
    //             );
    //             if(response.data.success)
    //             {
    //                 onEmployeeDelete(id);
    //             }

    //         } catch (error) {
    //             if(error.response && !error.response.data.success){
    //                 alert(error.response.data.error)
    //             }
    //         }
    //     }
    //};
    return(
        
               <button className='px-20 py-1 bg-teal-700 text-white' 
                onClick={()=>navigate('/admin-dashboard/salary/add')}
                >
                Edit 
              </button>
             

    )
}
// export const DeleteEmployee=({Id,onEmployeeDelete})=>{
//     const navigate=useNavigate()
//     const handleDelete=async(id)=>{
//         const confirm=window.confirm("Do you want to Delete ?");
//         if(confirm)
//         {
//             try {
//                 const response=await axios.delete(`http://localhost:5000/api/employee/${id}`,
//                     {
//                         headers:{
//                             Authorization:`Bearer ${localStorage.getItem("token")}`,
//                         },
//                     }
//                 );
//                 alert("Employee Deleted Successfully")
//                 navigate("/admin-dashboard/employees")
//                 if(response.data.success)
//                 {
//                     onEmployeeDelete(id);
//                 }

//             } catch (error) {
//                 if(error.response && !error.response.data.success){
//                     alert(error.response.data.error)
//                 }
//             }
//         }
//     }
//     return(
    
//         <button className='px-20 py-1 bg-red-800 text-white'  
//               onClick={()=>handleDelete(Id)}>
//                 Delete
//               </button>
     

//     )
// }
export const SalaryButtons=({Id})=>{
    const navigate=useNavigate();
    // const handleDelete=async(id)=>{
    //     const confirm=window.confirm("Do you want to Delete ?");
    //     if(confirm)
    //     {
    //         try {
    //             const response=await axios.delete(
    //                 `http://localhost:5000/api/employee/${id}`,
    //                 {
    //                     headers:{
    //                         Authorization:`Bearer ${localStorage.getItem("token")}`,
    //                     },
    //                 }
    //             );
    //             if(response.data.success)
    //             {
                    
    //             }
                
    //         } catch (error) {
                
    //         }
    //     }
    // }
    return(
       <div className='flex space-x-3'>
         <button className='px-3 py-1 bg-yellow-800 text-white'
         onClick={()=>navigate(`/admin-dashboard/salary/view/${Id}`)}>
                View Salary
               </button>
            <button className='px-3 py-1 bg-teal-700 text-white'
            onClick={()=>navigate(`/admin-dashboard/salary/add/${Id}`)}>
                Add Salary
               </button>
               
              
               

     </div>
    )
}