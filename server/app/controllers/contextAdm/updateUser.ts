import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../../src/database/data-source";

import { Usuario } from "../../entity/Usuario";

export async function updateUser(req: Request, res: Response) {
  // const { idUsuario } = req.body; // Pegue o idUsuario do corpo da requisição
  const { idUsuario } = req.params;

  try {
    const userRepository = AppDataSource.getRepository(Usuario);
    const usuario = await userRepository.findOne({where:{idUsuario}});
  

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualiza os campos do usuário com base nos dados fornecidos
    Object.assign(usuario, req.body);

    // Verifica se uma nova senha foi fornecida
    if (req.body.senha) {
      // Criptografa a nova senha
      const hashedPassword = await bcrypt.hash(req.body.senha, 10);
      usuario.senha = hashedPassword;
    }

    // Define a data de atualização como a data e hora atual
    usuario.atualizacaoData = new Date();

    // Salva as alterações no banco de dados
    await userRepository.save(usuario);

    res.json(usuario);
  } catch (error) {
    console.error("Error ao atualizar o usuário:", error);
    res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário" });
  }
}