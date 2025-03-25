// src/controllers/adminController.ts
import { Request, Response, NextFunction } from 'express';
import Theatre from '../models/Theatre.js';
import Hall from '../models/Hall.js';
import Movie from '../models/Movie.js';

/**
 * Adds a new theatre.
 * Expected request body: { name: string, city_id: number }
 */
export const addTheatre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, city_id } = req.body;
    if (!name || !city_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name and city_id',
      });
    }
    const theatre = await Theatre.query().insert({ name, city_id });
    return res.status(201).json({
      success: true,
      data: theatre,
      message: 'Theatre added successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Adds a new hall.
 * Expected request body: { name: string, theatre_id: number }
 */
export const addHall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, theatre_id } = req.body;
    if (!name || !theatre_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name and theatre_id',
      });
    }
    const hall = await Hall.query().insert({ name, theatre_id });
    return res.status(201).json({
      success: true,
      data: hall,
      message: 'Hall added successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Adds a new movie.
 * Expected request body: { title: string, duration: number, description?: string }
 */
export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, duration, description } = req.body;
    if (!title || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title and duration',
      });
    }
    const movie = await Movie.query().insert({ title, duration, description });
    return res.status(201).json({
      success: true,
      data: movie,
      message: 'Movie added successfully',
    });
  } catch (error) {
    next(error);
  }
};
