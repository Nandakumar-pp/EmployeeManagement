import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"
import Attendance from "../models/Attendance.js"
const addLeaveDates=async(req,res)=>{
    try {
        const {userId,leaveDate}=req.body
        const employee=await Employee.findOne({userId})
       // const employee = await Employee.findOne({ employeeId });
        const newAttendance=new Attendance({
           employeeId: employee._id,leaveDate,
        })

        await newAttendance.save()

      
        return res.status(200).json({success:true, message:"Attendance Added"})

        

      } catch (error) {
       console.log(error)
       
       return res.status(500).json({success:false,error:"Attendance add server error"})

      }

}
const getLeaveDates = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch all leaves based on employeeId
    let leaves = await Leave.aggregate([
      {
        $match: { employeeId: id }  // Match the employeeId (no filtering by status)
      },
      {
        $lookup: {
          from: "employees",  // Assuming your employee collection is named "employees"
          localField: "employeeId",
          foreignField: "_id",
          as: "employee_details"
        }
      }
    ]);

    // If no leaves are found, check if the employee exists and fetch the leaves for the employee
    if (leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });

      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }

      leaves = await Leave.aggregate([
        { 
          $match: { employeeId: employee._id }  // Fetch leaves by employeeId
        },
        {
          $lookup: {
            from: "employees",
            localField: "employeeId",
            foreignField: "_id",
            as: "employee_details"
          }
        }
      ]);
    }

    // Debugging: Check the leaves fetched
    console.log("Fetched leaves:", leaves);

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Calculate totalLeaveDays for only Approved leaves within the current year
    const totalLeaveDays = leaves.reduce((total, leave) => {
      // Debugging: Check each leave and its status
      console.log("Leave Status:", leave.status, "Start Date:", leave.startDate, "Days:", leave.days);

      // Convert startDate to a Date object
      const startDate = new Date(leave.startDate);
      const startYear = startDate.getFullYear();

      // Check if the leave status is Approved and the startDate is in the current year
      if (leave.status === "Approved" && leave.days && startYear === currentYear) {
        return total + leave.days;
      }
      return total;
    }, 0);

    // Debugging: Check totalLeaveDays
    console.log("Total Leave Days in Current Year:", totalLeaveDays);

    // Return the fetched leaves and total leave days
    return res.status(200).json({ success: true, leaves, totalLeaveDays });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server error while fetching leaves" });
  } 
};

// const getEmpLeave = async (req, res) => {
//   try {
//     const {id}=req.params;
//     let leaves=await Leave.find({employeeId:id})
//     if(!leaves)
//     {
//       const employee=await Employee.findOne({userId:id})
//       leaves=await Leave.find({employeeId:employee._id})
//     }
//     return res.status(200).json({success:true,leaves})
//   } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({success:false,error:"Leave getting server error"})
//   }
// };




// const getLeaveDates=async(req,res)=>{
//   try {
    
//     const leaves=await Leave.find().populate({
//       path:"employeeId",populate:[
//         {
//           path:"userId",
//           select:"name"
//         }
//       ]
//     })
//     return res.status(200).json({success:true,leaves})


//   } catch (error) {
//     console.log(error)
       
//        return res.status(500).json({success:false,error:"Leaves getting server error"})

//   }
// }
// const getLeaveDetail=async(req,res)=>{

//   try {
//     const {id}=req.params
//     const leave=await Leave.findById({_id:id}).populate({
//       path:"employeeId",populate:[
//         {
//           path:"userId",
         
//         }
//       ]
//     })
//     return res.status(200).json({success:true,leave})


//   } catch (error) {
//     console.log(error)
       
//        return res.status(500).json({success:false,error:"Leaves getting server error"})

//   }
// }
// const updateLeave = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, reply } = req.body; // Destructure status and reply from request body

//     // Update leave status and reply if the status is "Rejected"
//     const leave = await Leave.findByIdAndUpdate(
//       { _id: id },
//       { 
//         status,         // Update the status
//         reply: reply || ""  // Update the reply if provided, else default to an empty string
//       },
//       { new: true }  // Ensure the updated document is returned
//     );

//     // Check if leave exists
//     if (!leave) {
//       return res.status(404).json({ success: false, error: "Leave not Found" });
//     }

//     return res.status(200).json({ success: true });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, error: "Server error while updating leave" });
//   }
// };




export {addLeaveDates,getLeaveDates}