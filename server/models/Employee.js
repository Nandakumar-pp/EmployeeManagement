import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    employeeId:{type:String,required:true,unique:true},
    dob:{type:Date},
    gender:{type:String},
    maritalStatus:{type:String},
    designation:{type:String},
    phoneNo:{type:Number},
    salary:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
})
//employeeSchema.index({ userId: 1 });


const Employee=mongoose.model("Employee",employeeSchema);
export default Employee;