// controllers/clientController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Theatre from '../models/Theatre.js';
import Show from '../models/Show.js';
import Seat from '../models/Seat.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.query().insert({
      email,
      password: hashedPassword,
      name,
      role: 'client',
    });
    return res
      .status(201)
      .json({
        success: true,
        data: user,
        message: 'User registered successfully',
      });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.query().findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: '1h',
    });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

export const getCities = async (req, res, next) => {
  try {
    // In production, you may query a Cities table or an external API.
    const cities = ['City A', 'City B', 'City C'];
    return res.status(200).json({ success: true, data: cities });
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.query();
    return res.status(200).json({ success: true, data: movies });
  } catch (error) {
    next(error);
  }
};

export const getTheatres = async (req, res, next) => {
  try {
    const { city } = req.query;
    const query = Theatre.query();
    if (city) {
      query.where('city', city);
    }
    const theatres = await query;
    return res.status(200).json({ success: true, data: theatres });
  } catch (error) {
    next(error);
  }
};

export const getShows = async (req, res, next) => {
  try {
    const { theatreId, movieId } = req.query;
    const query = Show.query();
    if (theatreId) query.where('theatreId', theatreId);
    if (movieId) query.where('movieId', movieId);
    const shows = await query;
    return res.status(200).json({ success: true, data: shows });
  } catch (error) {
    next(error);
  }
};

export const getSeats = async (req, res, next) => {
  try {
    const { showId } = req.query;
    const seats = await Seat.query().where('showId', showId);
    return res.status(200).json({ success: true, data: seats });
  } catch (error) {
    next(error);
  }
};

export const bookTicket = async (req, res, next) => {
  try {
    // Expected req.body: { showId, seatIds: [ ... ] }
    const { showId, seatIds } = req.body;
    // Create a booking record linking the logged-in user with the show and selected seats.
    const booking = await Booking.query().insert({
      userId: req.user.id,
      showId,
      seatIds, // Could be an array or handled via a join table
    });
    return res
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

export const makePayment = async (req, res, next) => {
  try {
    // Expected req.body: { bookingId, amount, paymentMethod }
    const { bookingId, amount, paymentMethod } = req.body;
    // Process payment here (integrate with a payment gateway in production)
    const payment = await Payment.query().insert({
      bookingId,
      amount,
      paymentMethod,
      status: 'SUCCESS', // For demonstration; in production, update status based on gateway callback.
    });
    return res
      .status(200)
      .json({ success: true, data: payment, message: 'Payment successful' });
  } catch (error) {
    next(error);
  }
};

export const getBookingDetails = async (req, res, next) => {
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
    return res.status(200).json({ success: true, data: bookingDetails });
  } catch (error) {
    next(error);
  }
};
