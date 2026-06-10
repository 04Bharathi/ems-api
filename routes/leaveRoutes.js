import express from 'express'
import verifyUser from '../middlewares/authMiddleware.js'
import { addLeave, getLeaveById, getLeaves, getLeavesByLeaveId, changeStatus, leaveHistory } from '../controllers/leaveController.js'
const router = express.Router()

router.post("/request", verifyUser, addLeave)
router.get("/:id", verifyUser, getLeaveById)
router.get("/id/:id", verifyUser, getLeavesByLeaveId)
router.get("/", verifyUser, getLeaves)
router.get("/history/:id", verifyUser, leaveHistory)
router.put("/:id", verifyUser, changeStatus)

export default router