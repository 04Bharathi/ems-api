import mongoose from "mongoose";

import Employee from './Employee.js'
import Leaves from './Leaves.js'
import Salary from './Salary.js'

const departmentSchema = new mongoose.Schema({
    dep_name: {type: String, required: true}, 
    description: {type: String}, 
    createdAt: {type: Date, default: Date.now}, 
    updatedAt: {type:Date, default: Date.now}
})

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    console.log("Department middleware triggered");
    console.log("Department ID:", this._id);

    const employees = await Employee.find({
      department: this._id,
    });

    console.log("Employees found:", employees.length);

    const empIds = employees.map(emp => emp._id);

    await Employee.deleteMany({
      department: this._id,
    });

    await Leaves.deleteMany({
      employeeId: { $in: empIds },
    });

    await Salary.deleteMany({
      employeeId: { $in: empIds },
    });
  }
);
const Department = mongoose.model("Department", departmentSchema)

export default Department

