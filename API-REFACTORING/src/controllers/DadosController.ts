/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { prisma } from '../database';

const Dadoscontrollers = {
    async createDados(req: Request, res: Response) {
        try {
            const { data_c, server, dados, status } = req.body;

            const newDados = await prisma.log.create({
                data: {
                    data_c,
                    server,
                    dados,
                    status,
                },
            });

            return res.json({
                error: false,
                message: 'Success: dados criados com sucesso',
                dados: newDados,
            });
        } catch (error: any) {
            return res.json({ error: true, message: error.message });
        }
    },

    async listDados(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id, 10);
            const userExists = await prisma.user.findUnique({ where: { id: userId } });

            if (!userExists) {
                return res.json({
                    error: true,
                    message: 'Erro: usuário não encontrado',
                });
            }

            const dados = await prisma.log.findMany({
                where: {
                    server: userId,
                },
            });

            return res.json({
                error: false,
                message: 'Success: dados encontrados com sucesso',
                dados,
            });
        } catch (error: any) {
            return res.json({ error: true, message: error.message });
        }
    },

    async updateDados(req: Request, res: Response) {
        try {
            const { id, data_c, server, dados, status } = req.body;

            const updatedDados = await prisma.log.update({
                where: { id },
                data: {
                    data_c,
                    server,
                    dados,
                    status,
                },
            });

            return res.json({
                error: false,
                message: 'Success: dados atualizados com sucesso',
                dados: updatedDados,
            });
        } catch (error: any) {
            return res.json({ error: true, message: error.message });
        }
    },

    async deleteDados(req: Request, res: Response) {
        try {
            const { id } = req.body;

            const dadosExists = await prisma.log.findUnique({ where: { id } });

            if (!dadosExists) {
                return res.json({
                    error: true,
                    message: 'Erro: dados não encontrados',
                });
            }

            // Exclua o dado
            await prisma.log.delete({ where: { id } });

            return res.json({
                error: false,
                message: 'Success: dados excluídos com sucesso',
            });
        } catch (error: any) {
            return res.json({ error: true, message: error.message });
        }
    },
};

export default Dadoscontrollers;
