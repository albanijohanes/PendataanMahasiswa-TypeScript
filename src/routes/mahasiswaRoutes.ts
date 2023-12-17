import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as mahasiswaController from '../controllers/mahasiswaController';

const router = express.Router();

// public routes
router.get('/mahasiswa/', mahasiswaController.getAllMahasiswa);
router.get('/mahasiswa/:id', mahasiswaController.getMahasiswaById);

// private routes
router.use(authMiddleware);
router.post('/mahasiswa/', mahasiswaController.createMahasiswa);
router.put('/mahasiswa/:id', mahasiswaController.updateMahasiswa);
router.delete('/mahasiswa/:id', mahasiswaController.deleteMahasiswa);

export default router;