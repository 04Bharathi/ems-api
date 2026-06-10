import mongoose, { mongo, Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true}, 
    employeeId: {type: String, required: true, unique: true}, 
    dob: {type: Date, required: true}, 
    gender: {type: String, required: true},
    maritalStatus: {type: String, required: true},
    designation: {type: String, required: true},
    department: {type: Schema.Types.ObjectId, ref: "Department", required: true},
    salary: {type: Number, required: true},
    createdAT: {type: Date, default: Date.now()},
    updatedAT: {type: Date, default: Date.now()}
})

const Employee = mongoose.model("Employee", employeeSchema)
export default Employee