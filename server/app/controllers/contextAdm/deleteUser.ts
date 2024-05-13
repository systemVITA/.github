import { Request, Response } from "express";
import { AppDataSource } from "../../../src/database/data-source";
import { Usuario } from "../../entity/Usuario";

// Método para deletar um usuário pelo ID
export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const { idUsuario } = req.params;
  
    try {
      const userRepository = AppDataSource.getRepository(Usuario);
      const user = await userRepository.findOne({where:{idUsuario}});
  
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
  
      await userRepository.remove(user);
  
      return res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao excluir o usuário" });
    }
  }