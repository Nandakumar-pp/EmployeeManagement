import Salary from "../models/Salary.js"
import Employee from "../models/Employee.js"
import multer from 'multer'
import path from 'path'
import mongoose from 'mongoose'
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
});// Max file size 5MB
    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']; // Extend if needed
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);  // Reject if file type isn't allowed
        }
    };
    const addSalary = async (req, res) => {
        try {
            const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;
    
            // Ensure the receipt file is uploaded
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'Receipt file is required' });
            }
    
            // Extract the year and month from the payDate
            const payDateObj = new Date(payDate);
            const year = payDateObj.getFullYear();
            const month = payDateObj.getMonth(); // Months are zero-based (0 = January, 1 = February, etc.)
    
            // Check if a salary for this month already exists
            const existingSalary = await Salary.findOne({ 
                payDate: {
                    $gte: new Date(year, month, 1),  // Start of the month
                    $lt: new Date(year, month + 1, 1) // Start of the next month (exclusive)
                }
            });
    
            if (existingSalary) {
                alert("Salary already paid for this month");
                return res.status(400).json({ success: false, message: 'Salary already exists for this month' });
            }
    
            // Calculate the total salary (netsalary)
            const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    
            // Create a new salary record
            const newSalary = new Salary({
                employeeId,
                basicSalary,
                allowances,
                deductions,
                netsalary: totalSalary,
                receipt: req.file ? req.file.filename : null,  // Use the filename from the uploaded file
                payDate,
            });
    
            // Save the new salary record to the database
            await newSalary.save();
    
            // Return success message
            return res.status(200).json({ success: true, message: "Salary added successfully" });
    
        } catch (error) {
            // Handle duplicate key error for payDate (if the unique constraint is violated)
            if (error.code === 11000) {
                alert("Salary for this Month is already Paid");
                return res.status(400).json({ success: false, message: "Salary already exists for this pay date" });
            }
    
            // Log the error and return a generic server error message
            console.error("Error saving salary:", error.message);
            res.status(500).json({ success: false, error: "Salary Already Added for this month" });
        }
    };
    
    

const getSalary=async (req,res)=>{
    const {id}=req.params;
    try {
        
        let salary=await Salary.find({employeeId:id}).populate('employeeId','employeeId')
        if(!salary || salary.length<1)
        {
            const employee=await Employee.findOne({userId:id})
            salary=await Salary.find({employeeId:employee._id}).populate('employeeId','employeeId')

        }
        return res.status(200).json({success:true, salary})

    } catch (error) {
        console.log(error)
        
        return res.status(500).json({success:false,error:"Salary get server error"})
    }

}

const getSalaries=async(req,res)=>{
    
    try{
        let salaries=await Salary.find().populate('employeeId','employeeId')
        return res.status(200).json({success:true,salaries})
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({success:false,error:"get Employees server Error"})
    }
}

// const getSalaries = async (req, res) => {
//   try {
//     const salaries = await Salary.find()
//       .populate('employeeId', 'employeeId name') // Populate employee data
//       .exec();

//     if (salaries) {
//       res.status(200).json({
//         success: true,
//         salary: salaries,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: 'No salaries found',
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };


export {addSalary,getSalary,getSalaries,upload}