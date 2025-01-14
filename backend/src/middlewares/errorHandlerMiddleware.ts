import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }

  static requestError(message: string): AppError {
    return new AppError(400, message);
  }

  static resourceNotFound(message: string): AppError {
    return new AppError(404, message);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('[server]: A new error');
  console.error(err.stack);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusCode = (err as any).status || 500;
  const message = err.message || 'Internal Service Error';

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message
    }
  })
}