import { Router } from 'express';
import {
  getAllTheatres,
  getTheatresByCity,
  getTheatreById,
} from '../controllers/theatreController.js';

const router = Router();

router.get('/', getAllTheatres);
router.get('/city/:cityId', getTheatresByCity);
router.get('/:id', getTheatreById);

export default router;
