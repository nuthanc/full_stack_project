import { Router } from 'express';
import { getAllMovies, getMovieById } from '../controllers/movieController';

const router = Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);

export default router;
