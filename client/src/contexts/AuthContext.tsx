import React, { createContext, useState, useEffect } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { recoverUserInformation, signInRequest } from "../services/auth";
import axios from 'axios';

// Definição dos tipos para o contexto
type User = {
  idUsuario: string;
  email: string;
  perfilImagem: string;
  nomeDeUsuario: string;
  nivelDeAcesso: string;
  token: string;
};

type SignInData = {
  email: string;
  senha: string;
  nomeDeUsuario: string;
  nivelDeAcesso: string;
  idUsuario: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
  isAdministrator: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

// Criação do contexto
export const AuthContext = createContext({} as AuthContextType);

// Provedor do contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdministrator, setIsAdministrator] = useState(false);
  const isAuthenticated = !!user;
  const publicRoutes = ['/', '/auth/login', '/auth/register']; // Rotas públicas

  useEffect(() => {
    setLoading(true);
    const cookies = parseCookies(); // Obtém os cookies
    const token = cookies.token; // Obtém o token do cookie

    if (token) {
      recoverUserInformation()
        .then(userInfo => {
          if (userInfo && userInfo.usuario) {
            setUser({
              nomeDeUsuario: userInfo.usuario.nomeDeUsuario,
              email: userInfo.usuario.email,
              perfilImagem: userInfo.usuario.perfilImagem,
              nivelDeAcesso: userInfo.usuario.nivelDeAcesso,
              token: userInfo.usuario.token,
              idUsuario: userInfo.usuario.idUsuario,
            });

            const isUserAdmin = userInfo.usuario.nivelDeAcesso === 'administrador';
            setIsAdministrator(isUserAdmin);
          } else {
            setUser(null);
            setIsAdministrator(false);
          }
        })
        .catch(error => {
          console.error('Erro ao recuperar informações do usuário:', error);
          setUser(null);
          setIsAdministrator(false);
          Router.push('/');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  async function signIn({ email, senha, nomeDeUsuario }: SignInData) {
    const response = await signInRequest({ email, senha, nomeDeUsuario });
    const isUserAdmin = response.usuario.nivelDeAcesso === 'administrador';
    setIsAdministrator(isUserAdmin);
    setUser({
      idUsuario: response.usuario.idUsuario,
      email: response.usuario.email,
      perfilImagem: response.usuario.perfilImagem,
      nomeDeUsuario: response.usuario.nomeDeUsuario,
      nivelDeAcesso: response.usuario.nivelDeAcesso,
      token: response.token,
    });

    setCookie(undefined, 'token', response.token, {
      maxAge: 2 * 60 * 60,
      path: '/',
    });

    Router.push('/');
  }

  async function signOut() {
    try {
      await axios.get('http://localhost:3001/auth/logout');
      destroyCookie(undefined, 'token');
      setUser(null);
      setIsAdministrator(false);
      Router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAdministrator, user, isAuthenticated, signIn, signOut, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
