import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { UnauthorizedError, ValidationError, NotFoundError } from '../utils/errors.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, role, rollNo, cgpa, institute, phone, branchId } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ValidationError('Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: role || 'STUDENT',
      rollNo,
      cgpa,
      institute,
      phone,
      branchId
    }
  });

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } }
  });
});

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError('Unauthorized');

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true, cgpa: true, institute: true, rollNo: true, phone: true, branchId: true }
  });
  
  if (!user) throw new NotFoundError('User not found');

  res.status(200).json({ success: true, data: { user } });
});
