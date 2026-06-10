import express from 'express'
const router = express.Router()
import { getSummary } from '../controllers/dashboardController.js'

import verifyUser from '../middlewares/authMiddleware.js'


router.get("/", verifyUser, getSummary)

export default router