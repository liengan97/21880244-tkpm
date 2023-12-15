import { Request, Response, NextFunction } from 'express';

export const ping = async (req: Request, res: Response, next: NextFunction) => {
  const date = new Date().getTime()
  res.json({ date })
}