// usuarioController.ts

import { Request, Response } from 'express';
import { Usuario } from '../../entity/Usuario';
import { AppDataSource } from '../../../src/database/data-source';
import jwt from 'jsonwebtoken';

export async function updateMe(req: Request, res: Response): Promise<Response> {
    try {
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { idUsuario: string };
        const { idUsuario } = decodedToken;

        const userRepository = AppDataSource.getRepository(Usuario);
        const user = await userRepository.findOne({ where: { idUsuario } });


        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualizar os campos do usuário com base nos dados fornecidos no corpo da requisição
        Object.assign(user, req.body);

        // Salvar as alterações no banco de dados
        await userRepository.save(user);

        return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
