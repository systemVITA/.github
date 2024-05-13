import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['token']; // Alterado o nome do token
        if (!token) {
            throw new Error('Unauthenticated');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = decoded;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Unauthenticated" });
    }
};
