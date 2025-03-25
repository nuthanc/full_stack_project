import { Router } from 'express';
import { getAllCities, getCityById } from '../controllers/cityController.js';

const router = Router();

router.get('/', getAllCities);
router.get('/:id', getCityById);

export default router;
