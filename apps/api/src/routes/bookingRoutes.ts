// src/routes/bookingRoutes.ts
import { Router } from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticateUser, bookingController.bookTicket);
router.post('/payment', authenticateUser, bookingController.makePayment);
router.get(
  '/:bookingId',
  authenticateUser,
  bookingController.getBookingDetails
);

export default router;
