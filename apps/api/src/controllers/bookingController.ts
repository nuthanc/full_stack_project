// src/controllers/bookingController.ts
import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

export const bookTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Expected body: { showId: number, seatIds: number[] }
    const { showId, seatIds } = req.body;
    // Create a booking record linking the logged-in user with the show and selected seats.
    const booking = await Booking.query().insert({
      userId: req.user.id, // provided by auth middleware
      showId,
      seatIds,
    });
    res
      .status(201)
      .json({
        success: true,
        data: booking,
        message: 'Ticket booked successfully',
      });
  } catch (error) {
    next(error);
  }
};

export const makePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Expected body: { bookingId: number, amount: number, paymentMethod: string }
    const { bookingId, amount, paymentMethod } = req.body;
    // Process payment via an integrated gateway in production
    const payment = await Payment.query().insert({
      bookingId,
      amount,
      paymentMethod,
      status: 'SUCCESS',
    });
    res
      .status(200)
      .json({ success: true, data: payment, message: 'Payment successful' });
  } catch (error) {
    next(error);
  }
};

export const getBookingDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.params;
    const bookingDetails = await Booking.query()
      .findById(bookingId)
      .withGraphFetched('[user, show.[theatre, movie], seats]');
    if (!bookingDetails) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: bookingDetails });
  } catch (error) {
    next(error);
  }
};
