import express from 'express'

import verifyUser from '../middlewares/authMiddleware.js'
import { addEmployee, getEmployee, getEmployeeById, updateEmployee, upload, getEmployeesByDep } from '../controllers/employeeController.js'

const router = express.Router()
router.post("/add", verifyUser, upload.single('image'), addEmployee)
router.get("/", verifyUser, getEmployee)
router.get("/department/:id", verifyUser, getEmployeesByDep)
router.get("/:id", verifyUser, getEmployeeById)
router.put("/:id", verifyUser, updateEmployee)

export default router