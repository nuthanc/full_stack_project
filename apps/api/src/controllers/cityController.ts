// src/controllers/cityController.ts
import { Request, Response, NextFunction } from 'express';

export const getCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // In production, you might query a "cities" table or an external API.
    const cities = ['City A', 'City B', 'City C'];
    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    next(error);
  }
};
