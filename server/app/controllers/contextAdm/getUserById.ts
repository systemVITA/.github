import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../../src/database/data-source";
// import { generateAccessToken, generateRefreshToken } from "../../utils/auth";
import { Usuario } from "../../entity/Usuario";

// Método para obter um usuário pelo ID
export async function getUserById(req: Request, res: Response): Promise<Response> {
  const { idUsuario } = req.params;
  
    try {
      const userRepository = AppDataSource.getRepository(Usuario);
      const user = await userRepository.findOne({where:{idUsuario}});
  
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
  
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao buscar o usuário" });
    }
  }