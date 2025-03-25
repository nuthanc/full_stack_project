// src/controllers/bookingController.ts
import { Response, NextFunction } from 'express';
import Booking, { BookingInput } from '../models/Booking.js';
import BookingSeat from '../models/BookingSeat.js';
import Seat from '../models/Seat.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';

/**
 * Creates a new booking and associates seats through the booking_seats table.
 */
export const createBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { show_id, seat_ids } = req.body;
    if (!show_id || !seat_ids || !Array.isArray(seat_ids)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: show_id and seat_ids (array)',
      });
    }

    const parsedSeatIds = seat_ids.map((seat: any) => Number(seat));

    // Check if any seats are already booked for the same show
    const existingBookings = await BookingSeat.query()
      .join('bookings', 'booking_seats.booking_id', 'bookings.id')
      .whereIn('booking_seats.seat_id', parsedSeatIds)
      .andWhere('bookings.show_id', show_id);

    if (existingBookings.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Some of the selected seats are already booked',
      });
    }

    const bookingData: BookingInput = {
      user_id: Number(user.id),
      show_id,
    };

    // Create the booking
    const booking = await Booking.query().insert(bookingData);

    // Insert into booking_seats
    const bookingSeatsData = parsedSeatIds.map((seat_id: number) => ({
      booking_id: booking.id,
      seat_id,
    }));

    await BookingSeat.query().insert(bookingSeatsData);

    return res.status(201).json({
      success: true,
      data: { booking, seat_ids: parsedSeatIds },
      message: 'Booking created successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a booking by its ID.
 * Only admins or the user who created the booking can access its details.
 */
export const getBookingById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = parseInt(req.params.id, 10);
    if (isNaN(bookingId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid booking id' });
    }

    const booking = await Booking.query()
      .findById(bookingId)
      .withGraphFetched('[user, show, payment, seats]');

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }

    if (req.user.role !== 'admin' && booking.user_id !== Number(req.user.id)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all bookings for the currently authenticated user.
 */
export const getBookingsForUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const bookings = await Booking.query()
      .where('user_id', Number(user.id))
      .withGraphFetched('[show, payment, seats]');

    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};
