import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import {validationResult} from 'express-validator';

export const validationError = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) =>
        error.type === 'field' ? `${error.path}: ${error.msg}` : error.msg,
      )
      .join('. ');
    const error = Object.assign(new Error(messages), {status: 400});
    next(error);
    return;
  }
  next();
};

export const errorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = typeof err?.status === 'number' ? err.status : 500;
  const message = err instanceof Error ? err.message : 'Internal server error';

  res.status(status).json({message});
};

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = Object.assign(new Error(`Not Found - ${req.originalUrl}`), {
    status: 404,
  });
  next(error);
};
