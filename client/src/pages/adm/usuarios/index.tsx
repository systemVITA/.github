// pages/usuarios/index.js
import React, { useEffect, useState } from 'react';
import { getAPIClient } from '../../../services/axios';
import Link from 'next/link';
import { Header } from '../../partials/Header';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const api = getAPIClient();
    api.get('/adm/users')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar usuários', error);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Usuários</h1>
        <div className="space-y-4">

          {usuarios.map(usuario => (
            <div key={usuario.nomeDeUsuario} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-medium">{usuario.nomeDeUsuario}</p>
                  <p className="text-sm text-gray-600">ID: {usuario.idUsuario}</p>
                </div>
                <Link href={`/adm/usuarios/editar/${usuario.idUsuario}`}>
                  <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Editar
                  </span>
                </Link>
              </div>
            </div>
          ))}

        </div>
      </main>

    </>

  );
};

export default Usuarios;
