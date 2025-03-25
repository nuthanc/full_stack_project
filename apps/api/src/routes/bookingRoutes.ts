import { Router } from 'express';
import {
  createBooking,
  getBookingById,
  getBookingsForUser,
} from '../controllers/bookingController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authenticateUser, createBooking);
router.get('/my', authenticateUser, getBookingsForUser);
router.get('/:id', authenticateUser, getBookingById);

export default router;
