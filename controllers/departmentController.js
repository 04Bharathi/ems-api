import Department from "../models/Departments.js";

export const addDepartment = async (req, res) => {
    try {
        const {dep_name} = req.body;
        const description = req.body.description.trim() || ""
        const newDepartment = new Department({
            dep_name, 
            description
        })
        await newDepartment.save()
        res.status(200).json({
            success: true, 
            department: newDepartment, 
        })
    } catch(e) {
        res.status(500).json({success: false, message: e.message})
    }
}

export const getDepartments = async (req, res) => {
    try {
        const departmentList = await Department.find()
        return res.status(200).json({
            success: true, 
            departmentList
        })
    } catch(e) {
        res.status(500).json({
            success: false, 
            message: e.message
        })
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {dep_name} = req.body;
        const description = req.body.description.trim() || ""

        const updatedDepartment = await Department.findByIdAndUpdate(id, {
            dep_name, 
            description,
        }, {returnDocument: "after"}
        )

        if (!updatedDepartment) {
            return res.status(404).json({
                success: false, 
                message: "Department not found"
            })
        }

        return res.status(200).json({
            success: true, 
            updatedDepartment
        })
    } catch(e) {
        return res.status(500).json({
            success: false, 
            message: e.message
        })
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        await department.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully"
        });

    } catch (e) {
        console.error("Delete Department Error:", e);

        return res.status(500).json({
            success: false,
            message: e.message
        });
    }
};