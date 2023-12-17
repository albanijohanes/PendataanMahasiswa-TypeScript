import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import * as adminController from '../controllers/adminController';

const router = express.Router();

// public routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// private routes
router.use(authMiddleware);

export default router;