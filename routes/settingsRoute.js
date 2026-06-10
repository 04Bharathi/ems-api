import express from 'express'
import { changePassword } from '../controllers/settingsController.js'
import verifyUser from '../middlewares/authMiddleware.js'
const router = express.Router()

router.put("/settings", verifyUser, changePassword)

export default router