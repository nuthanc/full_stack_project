// src/controllers/movieController.ts
import { Request, Response, NextFunction } from 'express';
import Movie from '../models/Movie';

/**
 * Retrieves a list of all movies.
 */
export const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await Movie.query();
    return res.status(200).json({ success: true, data: movies });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves details for a single movie by id.
 */
export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid movie id' });
    }
    const movie = await Movie.query().findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: 'Movie not found' });
    }
    return res.status(200).json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
};
