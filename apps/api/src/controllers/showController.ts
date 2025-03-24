// src/controllers/showController.ts
import { Request, Response, NextFunction } from 'express';
import Show from '../models/Show.js';

export const getShows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { theatreId, movieId } = req.query;
    const query = Show.query();
    if (theatreId) query.where('theatreId', theatreId as string);
    if (movieId) query.where('movieId', movieId as string);
    const shows = await query;
    res.status(200).json({ success: true, data: shows });
  } catch (error) {
    next(error);
  }
};
