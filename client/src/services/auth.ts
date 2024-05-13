

import { setCookie } from 'nookies';

import axios from 'axios';
import { parseCookies } from 'nookies';

const API_URL = 'http://localhost:3001';

export async function signInRequest({ email, senha, nomeDeUsuario }) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      senha,
      nomeDeUsuario
    });

    const { token, usuario } = response.data;

    setCookie(undefined, 'token', token, {
      maxAge: 4 * 60 * 60, // 4 horas
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    // setCookie(undefined, 'token', token, {
    //   maxAge: 4 * 60 * 60, // 4 horas
    //   path: '/',
    //   secure: process.env.NODE_ENV === 'production', // Mantido como estava
    //   sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // Corrigido para 'None'
    // });
    

    console.log(usuario)

    return {
      token,
      usuario: {
        email: usuario.email,
        nomeDeUsuario: usuario.nomeDeUsuario,
        perfilImagem: usuario.perfilImagem, // Se disponível
        nivelDeAcesso:usuario.nivelDeAcesso,
        idUsuario: usuario.idUsuario,
      }
    };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}






type UserInfo = {
  usuario: {
    idUsuario: string;
    nomeDeUsuario: string;
    email: string;
    perfilImagem: string;
    nivelDeAcesso:string;
    token:string;
  };
};


export function recoverUserInformation(): Promise<UserInfo | null> {
  return new Promise((resolve, reject) => {
    const { 'token': token } = parseCookies();

    if (!token) {
      console.log("Token não encontrado nos cookies.");
      reject(new Error('Token não encontrado'));
      return;
    }

    try {
      // Decodifica o token JWT manualmente, você precisa ajustar de acordo com a estrutura do seu token
      const decodedToken = parseJwt(token);

      const usuario = {
        nomeDeUsuario: decodedToken.nomeDeUsuario,
        email: decodedToken.email,
        perfilImagem: decodedToken.perfilImagem,
        nivelDeAcesso: decodedToken.nivelAcesso,
        token: token,
        idUsuario:decodedToken.idUsuario
      };
      console.log(usuario.nivelDeAcesso)

      resolve({ usuario });
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      reject(error);
    }
  });
}


// Função para criar uma instância do axios com configuração de token
export function getAPIClient(ctx?: any) {
  const { 'token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: API_URL,
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}


// Função para decodificar o token JWT manualmente
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
}
