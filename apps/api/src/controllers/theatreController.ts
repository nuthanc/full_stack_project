// src/controllers/theatreController.ts
import { Request, Response, NextFunction } from 'express';
import Theatre from '../models/Theatre.js';

/**
 * Retrieves a list of all theatres.
 */
export const getAllTheatres = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theatres = await Theatre.query();
    return res.status(200).json({ success: true, data: theatres });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves theatres by a specific city id.
 * Expects req.params.cityId as the city identifier.
 */
export const getTheatresByCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cityId = parseInt(req.params.cityId, 10);
    if (isNaN(cityId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid city id' });
    }
    const theatres = await Theatre.query().where('city_id', cityId);
    return res.status(200).json({ success: true, data: theatres });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves details for a single theatre by id.
 */
export const getTheatreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theatreId = parseInt(req.params.id, 10);
    if (isNaN(theatreId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid theatre id' });
    }
    const theatre = await Theatre.query().findById(theatreId);
    if (!theatre) {
      return res
        .status(404)
        .json({ success: false, message: 'Theatre not found' });
    }
    return res.status(200).json({ success: true, data: theatre });
  } catch (error) {
    next(error);
  }
};
