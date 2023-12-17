import express from 'express';
import adminRoutes from './adminRoutes';
import mahasiswaRoutes from './mahasiswaRoutes';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/mahasiswa', mahasiswaRoutes);

export default router;