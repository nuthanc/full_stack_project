import { Router } from 'express';
import { addTheatre, addHall, addMovie } from '../controllers/adminController';
import { authenticateAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/theatres', authenticateAdmin, addTheatre);
router.post('/halls', authenticateAdmin, addHall);
router.post('/movies', authenticateAdmin, addMovie);

export default router;
