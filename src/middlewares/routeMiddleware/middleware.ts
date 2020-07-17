import { Request, Response, NextFunction } from 'express';

export function middleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.auth) {
        res.status(400).send("Unauthorized");
    } else
        next()
}