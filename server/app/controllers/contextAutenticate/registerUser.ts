import { Request, Response } from "express";
import { validate } from 'class-validator';
import { AppDataSource } from "../../../src/database/data-source";
import { Usuario } from "../../entity/Usuario";

export async function registerUser(req: Request, res: Response): Promise<Response> {
  const {
    nomeDeUsuario, senha, email, termosDeUso, statusAtivacao,
    nomeCompleto, perfilImagem, telefone, ocupacao,
    descricao, pais, estado, cidade, matricula, instituicao
  } = req.body;

  try {
    if (!termosDeUso) {
      return res.status(400).json({ error: 'Você deve concordar com os termos de uso.' });
    }

    const newUser = new Usuario({
      nomeDeUsuario,
      email,
      senha,
      termosDeUso,
      statusAtivacao,
      nomeCompleto, 
      perfilImagem, 
      telefone, 
      ocupacao,
      descricao, 
      pais, 
      estado, 
      cidade, 
      matricula, 
      instituicao
    });

    const errors = await validate(newUser);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const userRepository = AppDataSource.getRepository(Usuario);

    const existingUser = await userRepository.findOne({
      where: [{ nomeDeUsuario }, { email }],
    });

    if (existingUser) {
      if (existingUser.nomeDeUsuario === nomeDeUsuario) {
        return res.status(409).json({ error: 'O nome de usuário já está cadastrado.' });
      }
      if (existingUser.email === email) {
        return res.status(409).json({ error: 'E-mail já está cadastrado.' });
      }
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(senha)) {
      return res.status(400).json({ error: 'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' });
    }

    newUser.hashPassword();

    await userRepository.save(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro Interno do Servidor, tente novamente mais tarde.' });
  }
}