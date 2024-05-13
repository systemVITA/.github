import { Request, Response } from "express";
import { AppDataSource } from "../../../src/database/data-source";
import { Usuario } from "../../entity/Usuario";


// Método para obter todos os usuários
export async function getUsersAll(req: Request, res: Response): Promise<Response> {
    try {
      const userRepository = AppDataSource.getRepository(Usuario);
      const users = await userRepository.find();
  
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao buscar os usuários" });
    }
  }
