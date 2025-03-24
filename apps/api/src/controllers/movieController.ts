// src/controllers/movieController.ts
import { Request, Response, NextFunction } from 'express';
import Movie from '../models/Movie.js';

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await Movie.query();
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    next(error);
  }
};
