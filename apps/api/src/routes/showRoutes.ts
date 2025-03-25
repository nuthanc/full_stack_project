import { Router } from 'express';
import {
  getAllShows,
  getShowsByMovie,
  getShowsByTheatre,
} from '../controllers/showController';

const router = Router();

router.get('/', getAllShows);
router.get('/movie/:movieId', getShowsByMovie);
router.get('/theatre/:theatreId', getShowsByTheatre);

export default router;
