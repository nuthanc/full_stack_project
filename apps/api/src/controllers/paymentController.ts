import { Response, NextFunction } from 'express';
import Payment from '../models/Payment';
import Booking from '../models/Booking';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { booking_id, amount, payment_method } = req.body;

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!booking_id || !amount || !payment_method) {
      return res.status(400).json({
        success: false,
        message: 'booking_id, amount, and payment_method are required',
      });
    }

    // Ensure the booking belongs to the user
    const booking = await Booking.query().findById(booking_id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }
    if (booking.user_id.toString() !== user.id && user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Prevent duplicate payment
    const existing = await Payment.query().findOne({ booking_id });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Payment already exists for this booking',
      });
    }

    // Create mock payment
    const payment = await Payment.query().insert({
      booking_id,
      amount,
      status: 'completed',
      payment_time: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment successful',
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentByBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { booking_id } = req.params;

    const booking = await Booking.query().findById(booking_id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }
    if (booking.user_id !== Number(user.id) && user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const payment = await Payment.query().findOne({ booking_id });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};
