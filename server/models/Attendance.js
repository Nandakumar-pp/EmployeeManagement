import mongoose from "mongoose";
import { Schema } from "mongoose";

const AttendanceSchema=new Schema({
    employeeId:{type:Schema.Types.ObjectId,ref:'Employee',required:true},
    leaveDate:{type:Date,required:true},
    
    appliedAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});
const Attendance=mongoose.model('Attendance',AttendanceSchema);

export default Attendance