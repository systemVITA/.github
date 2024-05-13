import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['token'] || req.headers.authorization?.split(' ')[1]; // Tenta obter o token das cookies ou do cabeçalho
        if (!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ error: "Unauthenticated" });
            }
            
       
        const idUsuario = decoded.idUsuario;
        if (!idUsuario) throw new Error('Invalid token');

            next();
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};