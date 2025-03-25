// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Registers a new user.
 * Expected request body: { username: string, email: string, password: string, role?: string }
 * Defaults role to 'client'.
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: username, email, or password',
      });
    }
    // Check if the email is already registered
    const existingUser = await User.query().findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.query().insert({
      username,
      email,
      password: hashedPassword,
      role: role || 'client',
    });
    return res.status(201).json({
      success: true,
      data: user,
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logs in a user (client or admin).
 * Expected request body: { email: string, password: string }
 * Returns a JWT token on successful authentication.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email or password',
      });
    }
    const user = await User.query().findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    // Generate JWT including user id and role
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: '1h',
    });
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
