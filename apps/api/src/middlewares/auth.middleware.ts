import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing token' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev';
    const decoded = jwt.verify(token, secret) as any;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};
