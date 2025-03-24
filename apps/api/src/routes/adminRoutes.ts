// src/routes/adminRoutes.ts
import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', adminController.adminLogin);
router.post('/theatres', authenticateAdmin, adminController.addTheatre);
router.post('/halls', authenticateAdmin, adminController.addHall);
router.post('/movies', authenticateAdmin, adminController.addMovie);

export default router;
