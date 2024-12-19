import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number },
    deductions: { type: Number },
    netsalary: { type: Number },
    payDate: { type: Date, required: true },
    receipt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create a unique index on the payDate field to ensure that no two salaries have the same payDate globally
salarySchema.index({ payDate: 1 }, { unique: true });

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
