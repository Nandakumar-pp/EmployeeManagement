import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema=new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role: {type: String, enum: ["admin","hr","employee"], required: true},
    profileImage: {type: String,required:true},
    createat: {type: Date, default: Date.now},
    updateat: {type:Date, default: Date.now}
})

const User=mongoose.model("User",userSchema);
export default User;