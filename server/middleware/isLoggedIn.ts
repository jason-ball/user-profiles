import { Request, Response, NextFunction } from 'express';

export default function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ errors: ['not logged in'] });
  }
}
