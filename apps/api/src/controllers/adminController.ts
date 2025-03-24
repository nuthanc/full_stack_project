// src/controllers/adminController.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Theatre from '../models/Theatre.js';
import Movie from '../models/Movie.js';
import Hall from '../models/Hall.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const admin = await User.query().findOne({ email });
    if (!admin || admin.role !== 'admin') {
      return res
        .status(401)
        .json({
          success: false,
          message: 'Invalid credentials or access denied',
        });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin.id, role: admin.role }, SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

export const addTheatre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theatre = await Theatre.query().insert(req.body);
    res
      .status(201)
      .json({
        success: true,
        data: theatre,
        message: 'Theatre added successfully',
      });
  } catch (error) {
    next(error);
  }
};

export const addHall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hall = await Hall.query().insert(req.body);
    res
      .status(201)
      .json({ success: true, data: hall, message: 'Hall added successfully' });
  } catch (error) {
    next(error);
  }
};

export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await Movie.query().insert(req.body);
    res
      .status(201)
      .json({
        success: true,
        data: movie,
        message: 'Movie added successfully',
      });
  } catch (error) {
    next(error);
  }
};
