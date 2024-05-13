import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['token']; // Alterado o nome do token
        if (!token) {
            throw new Error('Unauthenticated');
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.nivelAcesso !== 'administrador') {
            throw new Error('Unauthorized');
        }

        res.locals.user = decoded;

        next();
    } catch (err) {
        console.error(err);
        if (err.message === 'Unauthorized') {
            res.status(403).json({ error: "Unauthorized" });
        } else {
            res.status(401).json({ error: "Unauthenticated" });
        }
    }
};
