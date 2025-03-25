// src/controllers/showController.ts
import { Request, Response, NextFunction } from 'express';
import Show from '../models/Show';

/**
 * Retrieves a list of all shows.
 * Optionally fetch related movie and hall data.
 */
export const getAllShows = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shows = await Show.query().withGraphFetched('[movie, hall]');
    return res.status(200).json({ success: true, data: shows });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves shows for a specific movie.
 * Expects req.params.movieId as the movie identifier.
 */
export const getShowsByMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movieId = parseInt(req.params.movieId, 10);
    if (isNaN(movieId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid movie id' });
    }
    const shows = await Show.query()
      .where('movie_id', movieId)
      .withGraphFetched('[hall]');
    return res.status(200).json({ success: true, data: shows });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves shows for a specific theatre.
 * Expects req.params.theatreId as the theatre identifier.
 * Assumes Show model has a relation to Hall which in turn has theatre_id.
 */
export const getShowsByTheatre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theatreId = parseInt(req.params.theatreId, 10);
    if (isNaN(theatreId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid theatre id' });
    }
    const shows = await Show.query()
      .joinRelated('hall')
      .where('hall.theatre_id', theatreId)
      .withGraphFetched('[movie, hall]');
    return res.status(200).json({ success: true, data: shows });
  } catch (error) {
    next(error);
  }
};
