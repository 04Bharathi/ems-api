import express from 'express'
const router = express.Router()

import { userLogin, verify } from "../controllers/authController.js";
import verifyUser from '../middlewares/authMiddleware.js';

router.post("/login", userLogin);
router.get("/verify", verifyUser, verify);

export default router;