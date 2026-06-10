import express from 'express'
import verifyUser from '../middlewares/authMiddleware.js'
import { addSalary, getSalary } from '../controllers/salaryController.js'
const router = express.Router()

router.post("/add", verifyUser, addSalary)
router.get("/:id", verifyUser, getSalary)

export default router