import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

export const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, dedections, payDate } =
      req.body;

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(dedections);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      dedections,
      payDate,
      netSalary: totalSalary,
    });

    await newSalary.save();

    return res.status(200).json({
      success: true,
      newSalary,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary;
    salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId",
    );
    if (!salary || salary.length < 1) {
      let employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId",
      );
    }
    return res.status(200).json({
      success: true,
      salary,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
