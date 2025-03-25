// src/routes/seatRoutes.ts
import express from 'express';
import { getAvailableSeats } from '../controllers/seatController.js';

const router = express.Router();

// GET /api/seats/available/:show_id
router.get('/available/:show_id', getAvailableSeats);

export default router;
