import express from 'express'
import verifyUser from '../middlewares/authMiddleware.js'
import { addDepartment, deleteDepartment, getDepartments, updateDepartment } from '../controllers/departmentController.js'

const router = express.Router()
router.post('/add', verifyUser, addDepartment)
router.get('/', verifyUser, getDepartments)
router.put('/:id', verifyUser, updateDepartment)
router.delete('/:id', verifyUser, deleteDepartment)

export default router