// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export interface JwtPayload {
  id: string;
  role: string;
  // Add more fields here if needed
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({
          success: false,
          message: 'Authorization header missing or malformed',
        });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    if (!decoded || !decoded.id || !decoded.role) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid token payload' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
};

export const authenticateAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  authenticateUser(req, res, () => {
    if (req.user?.role === 'admin') {
      return next();
    }
    return res
      .status(403)
      .json({ success: false, message: 'Admin privileges required' });
  });
};
