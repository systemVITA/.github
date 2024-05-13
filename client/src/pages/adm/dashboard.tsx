import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { getAPIClient } from '../../services/axios';
import { Header } from '../partials/Header';
import Relogio from '../components/Relogio';
import MapComponent from '../components/MapComponent';

const Dashboard = () => {
  const { user, isAuthenticated, isAdministrator } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/auth/login');
    } else if (!isAdministrator) {
      Router.push('/nao-autorizado');
    } else {
      const api = getAPIClient();
      api.get('/auth/me')
        .then(response => {
          setUserInfo(response.data.user);
        })
        .catch(error => {
          console.error('Erro ao buscar informações do usuário', error);
        });
    }
  }, [isAuthenticated, user, isAdministrator]);

  const coordinates = {
    latitude: -2.543800773620317,
    longitude: -44.2031752440421
  };

  return (
    <>
      <Header />
      {isAdministrator && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div>
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            {userInfo && (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="font-semibold">Olá, seja bem-vindo: <span className="font-normal">{userInfo.nomeDeUsuario}</span></p>
                <p className="font-semibold">Seu nível de Acesso é: <span className="font-normal">{userInfo.nivelAcesso}</span></p>
                <Relogio />
              </div>
            )}
            <div className="mb-8">
            </div>
            <Link href="/adm/usuarios/">
              <span className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg hover:bg-gray-100">
                <div>
                  <h2 className="text-xl font-semibold">Usuários &rarr;</h2>
                  <p className="mt-2 text-gray-600">Veja e modifique as informações dos usuários.</p>
                </div>
              </span>
            </Link>
          </div>
          <div className='m-8'>
            {/* Passando as coordenadas como uma prop chamada coordinates */}
            <MapComponent coordinates={coordinates}/> 
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
