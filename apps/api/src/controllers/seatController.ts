// src/controllers/seatController.ts
import { Request, Response, NextFunction } from 'express';
import Seat from '../models/Seat.js';
import BookingSeat from '../models/BookingSeat.js';
import Show from '../models/Show.js';

export const getAvailableSeats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { show_id } = req.params;

    const show = await Show.query().findById(show_id).withGraphFetched('hall');
    if (!show) {
      return res
        .status(404)
        .json({ success: false, message: 'Show not found' });
    }

    const bookedSeats = await BookingSeat.query()
      .join('bookings', 'booking_seats.booking_id', 'bookings.id')
      .where('bookings.show_id', show_id)
      .select('seat_id');

    const bookedSeatIds = bookedSeats.map((bookingSeat) => bookingSeat.seat_id);

    const allSeats = await Seat.query().where('hall_id', show.hall_id);

    const availableSeats = allSeats.filter(
      (seat) => !bookedSeatIds.includes(seat.id)
    );

    res.status(200).json({ success: true, data: availableSeats });
  } catch (error) {
    next(error);
  }
};
