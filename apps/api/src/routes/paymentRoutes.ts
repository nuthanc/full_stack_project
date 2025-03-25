// src/routes/paymentRoutes.ts
import express from 'express';
import {
  createPayment,
  getPaymentByBooking,
} from '../controllers/paymentController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @route   POST /api/payments
 * @desc    Make a payment for a booking
 * @access  Authenticated users only
 */
router.post('/', authenticateUser, createPayment);

/**
 * @route   GET /api/payments/:booking_id
 * @desc    Get payment by booking ID
 * @access  Authenticated users only
 */
router.get('/:booking_id', authenticateUser, getPaymentByBooking);

export default router;
