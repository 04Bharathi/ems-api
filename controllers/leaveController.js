import path from "path";
import Leaves from "../models/Leaves.js";
import Employee from "../models/Employee.js";

export const addLeave = async (req, res) => {
    try {
        console.log(req.body)
        const {userId, leaveType, startDate, endDate, reason} = req.body;
        const employee = await Employee.findOne({userId})
        if (!employee) {
            return res.status(400).json({
                success: false, 
                message: "Employee not found"
            })
        }
        const newLeave = await new Leaves({
            employeeId: employee._id, 
            leaveType,
            startDate,
            endDate, 
            reason
        }) 
        await newLeave.save()
        return res.status(200).json({
            success: true, 
            newLeave
        })
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
}

export const getLeaveById = async(req, res) => {
    try {
        const {id} = req.params; 
        const employee = await Employee.findOne({userId: id})
        if (!employee) {
            return res.status(400).json({
                success: false, 
                message: "Employee not found"
            })
        }
        const fetchleaves = await Leaves.find({employeeId: employee._id})
        return res.status(200).json({
            success: true, 
            fetchleaves
        })
    } catch(e) {
        return res.status(400).json({
            success: false, 
            message: e
        })
    }
}

export const getLeaves = async (req, res) => {
    try {
        const employee = await Employee.findById("6a1e9dc583c63644325519ee")
        // const leave = await Leaves.find()
        //  return res.status(200).json({
        //     success: true, 
        //     leave, 
        //     employee
        // })
        const leaves = await Leaves.find().populate({
            path: "employeeId", 
            populate: [
                {
                    path: "department", 
                    select: "dep_name"
                }, 
                {
                    path: "userId", 
                    select: "name"
                }
            ]
        })
        return res.status(200).json({
            success: true, 
            leaves
        })
    } catch(e) {
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
}

export const getLeavesByLeaveId = async (req, res) => {
    try {
        const { id } = req.params;

        const leaveDetails = await Leaves.findById(id).populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name profileImage"
                }
            ]
        });

        if (!leaveDetails) {
            return res.status(404).json({
                success: false,
                message: "Leave record not found"
            });
        }

        return res.status(200).json({
            success: true,
            leaveDetails
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};

export const changeStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body
        console.log(status)
        const updateStatus = await Leaves.findByIdAndUpdate(id, {status}, { returnDocument: "after" })
        return res.status(200).json({
            success: true, 
            updateStatus
        })

    } catch(e) {
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
}

export const leaveHistory = async (req, res) => {
    try {
        const {id} = req.params
        const leaveList = await Leaves.find({employeeId: id})
        if (!leaveList) {
            return res.status(400).json({
                success: false, 
                message: "No Leaves Appiled"
            })
        } 

        return res.status(200).json({
            success: 200,
            leaveList
        })
    } catch(e) {
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
}