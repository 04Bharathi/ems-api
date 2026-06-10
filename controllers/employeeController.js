import bcrypt from "bcrypt";
import path from "path";
import multer from "multer";

import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Departments.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      designation,
      dob,
      gender,
      maritalStatus,
      department,
      salary,
      employeeId,
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already registered as Employee",
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashPassword,
      profileImage: req.file ? req.file.filename : "defaultImg.jpg",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "Employee added successfully",
      newEmployee,
    });
  } catch (e) {
    return res.status(500).json({
      success: false, 
      message: e.message
    })
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department", { dep_name: 1 });

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, maritalStatus, designation, salary, role } =
      req.body;
    console.log(req.body);
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const updateUser = await User.findByIdAndUpdate(employee.userId, {
      name,
      role,
    });
    const updateEmployee = await Employee.findByIdAndUpdate(id, {
      salary,
      designation,
      maritalStatus,
      department,
    });
    console.log(updateEmployee);

    if (!updateUser || !updateEmployee) {
      return res.status(400).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      updateEmployee,
    });

    // const updateEmployee = await Employee.findById(id).populate("userId", {name: 1, profileImage: 1}).populate("department", {dep_name: 1})
    // return res.status(200).json({
    //     success: true,
    //     employee
    // })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const getEmployeesByDep = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id });
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (e) {
    return res.status(500).json({
      success: false, 
      message: e.message
    });
  }
};
