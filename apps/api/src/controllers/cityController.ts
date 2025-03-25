// src/controllers/cityController.ts
import { Request, Response, NextFunction } from 'express';
import City from '../models/City'; // Ensure your City model is defined

/**
 * Retrieves a list of all cities.
 */
export const getAllCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cities = await City.query();
    return res.status(200).json({ success: true, data: cities });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves details for a single city by id.
 */
export const getCityById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cityId = parseInt(req.params.id, 10);
    if (isNaN(cityId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid city id' });
    }
    const city = await City.query().findById(cityId);
    if (!city) {
      return res
        .status(404)
        .json({ success: false, message: 'City not found' });
    }
    return res.status(200).json({ success: true, data: city });
  } catch (error) {
    next(error);
  }
};
