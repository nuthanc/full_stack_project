// routes/clientRoutes.js
import { Router } from 'express';

const router = Router();

// Authentication routes
router.post('/login', clientController.login);
router.post('/register', clientController.register);

// Public endpoints
router.get('/cities', clientController.getCities);
router.get('/movies', clientController.getMovies);
router.get('/theatres', clientController.getTheatres);
router.get('/shows', clientController.getShows);
router.get('/seats', clientController.getSeats);

// Protected endpoints
router.post('/booking', authenticateUser, clientController.bookTicket);
router.post('/payment', authenticateUser, clientController.makePayment);
router.get(
  '/booking/:bookingId',
  authenticateUser,
  clientController.getBookingDetails
);

export default router;
