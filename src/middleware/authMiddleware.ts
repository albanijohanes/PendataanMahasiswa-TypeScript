// authMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json('Anda tidak memiliki akses');
    return;
  }
  try {
    const payload = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET as string
    ) as TokenPayload;
    req.user = payload;
    next();
  } catch (error) {
    console.error('Gagal dalam verifikasi token', error);
    res.status(401).json('Token tidak valid');
  }
};
