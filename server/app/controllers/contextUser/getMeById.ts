
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const getMeById = (req: Request, res: Response) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).json({ error: 'Token não encontrado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Retorna tanto o usuário decodificado quanto o token
        return res.json({
            
            user: decoded, // Informações do usuário decodificadas do token
            
            token: token   // O token JWT
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Token inválido' });
    }
    
};

export default getMeById;
