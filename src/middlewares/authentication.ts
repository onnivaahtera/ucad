import jwt from 'jsonwebtoken';
import 'dotenv/config';
import type {NextFunction, Request, Response} from 'express';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('token:', token);

  if (token == null) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (e) {
    res.status(403).send({message: 'invalid token'});
  }
};
