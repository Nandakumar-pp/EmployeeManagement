import Employee from '../models/Employee.js'
import User from '../models/User.js' 
import Salary from '../models/Salary.js'
import Leave from '../models/Leave.js'
import bcrypt from 'bcrypt'
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
const upload=multer({storage:storage})

const addEmployee=async (req,res)=>{
    try{

    
   const{
    name,
    email,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    phoneNo,
    salary,
    password,
    role

   }=req.body;
   const user=await User.findOne({email})
   if(user)
   {
    return res.status(400).json({success:false , error:"User Already Exist"});
   }
   const hashPassword=await bcrypt.hash(password,10)
   const newUser=new User({
    name,
    email,
    password:hashPassword,
    role,
    profileImage: req.file ? req.file.filename : ""
   })
   const savedUser=await newUser.save()
   const newEmployee=new Employee({
     userId:savedUser._id,
     employeeId,
     dob,
     gender,
     maritalStatus,
     designation,
     phoneNo,
     salary
   })
   await newEmployee.save()
   return res.status(200).json({success:true, message:"Employee Created"})
  }catch(error)
    {
       return res.status(500).json({success:false,error:"Server Error in Adding Employee"})
    }
}

const getEmployees=async(req,res)=>{
    
    try{
        const employees=await Employee.find().populate('userId',{password:0})
        return res.status(200).json({success:true,employees})
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({success:false,error:"get Employees server Error"})
    }
}
const getEmployee=async(req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid employee ID' });
    }
    try{
        let employee;
        employee=await Employee.findById({_id:id}).populate('userId',{password:0})
        if(!employee)
        {
            employee=await Employee.findOne({userId:id}).populate('userId',{password:0})
        }
        return res.status(200).json({success:true,employee})
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({success:false,error:"get Employee server Error"})
    }
}
const updateEmployee = async(req,res)=>{
    try {
        const {id}=req.params;
        const{
            name,
            email,
            designation,
            employeeId,
            role
        
           }=req.body;
           const employee=await Employee.findById({_id:id})
           if(!employee)
           {
            return res.status(404).json({success:false,error:"Employee not found"})

           }
           const user =await User.findById({_id:employee.userId})
           if(!user)
           {
            return res.status(404).json({success:false,error:"User not found"})

           }
           const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name,email,role})
           const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{designation,salary})
           if(!updateEmployee || !updateUser)
           {
            return res.status(404).json({success:false,error:"document not found"})

           }
       return res.status(200).json({success:true,message:"Employee Updated"})
    } catch (error) {
        return res.status(500).json({success:false,error:"update Employees server Error"})

    }
}
const deleteEmployee= async(req,res)=>{
    try{
        const {id}=req.params;
        const employee = await Employee.findById(id);
        const userId = employee.userId;
        const deletedSalaries = await Salary.deleteMany({ employeeId: id });
        const deletedLeaves = await Leave.deleteMany({ employeeId: id });
        if (deletedSalaries.deletedCount === 0) {
            console.log('No salary records found for this employee.');
        }
        const updateEmp=await Employee.findByIdAndDelete({_id:id})
        await User.findByIdAndDelete(userId);
        // let salary=await Salary.find({employeeId:id}).populate('employeeId','employeeId')

        // await Salary.findByIdAndDelete(salary._id)
        return res.status(200).json({success:true,updateEmp,deletedSalaries,deletedLeaves})
    }
    catch(error)
    {
        return res.status(500).json({success:false,error:"Delete Employee Server Error"})
    }
}

export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,deleteEmployee}