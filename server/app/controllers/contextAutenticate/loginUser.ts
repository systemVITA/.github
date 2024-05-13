import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../../../src/database/data-source';
import { Usuario } from '../../entity/Usuario';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export function generateAccessToken(idUsuario: string, nivelAcesso: string, nomeDeUsuario: string, email:string, perfilImagem:string): string {
  const payload = {
    idUsuario,
    nivelAcesso,
    nomeDeUsuario,
    email,
    perfilImagem
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });
}

export async function loginUser(req: Request, res: Response): Promise<Response> {
  const { nomeDeUsuario, senha, email } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Usuario);

    // Verificar se o usuário existe no banco de dados
    const usuario = await userRepository.findOne({
      where: [{ email }, { nomeDeUsuario }],
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Nome de usuário ou E-mail inválido' });
    }

    // Comparar a senha fornecida com a senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Atualizar informações de último login e IP
    const ipUltimoLogin = req.ip; // Ou outro método para obter o IP, dependendo da configuração do servidor
    usuario.ultimoLogin = new Date();
    usuario.ipUltimoLogin = ipUltimoLogin;

    // Salvar as alterações no usuário
    await userRepository.save(usuario);

    // Gerar o token de acesso
    const token = generateAccessToken(usuario.idUsuario, usuario.nivelAcesso, usuario.nomeDeUsuario, usuario.email,usuario.perfilImagem);

     // Armazenar informações do usuário em res.locals
     res.locals.user = {...usuario, senha: undefined};

    // Definir o cookie com o token de acesso
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'developmente',
      sameSite: 'none',
      maxAge: 4 * 60 * 60 * 1000, // Four hours in milliseconds
      path: '/'
    });

    return res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      usuario: {
        ...usuario,
        senha: undefined, // Exclui a senha do objeto retornado
        ipUltimoLogin,
        ultimoLogin: usuario.ultimoLogin,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
