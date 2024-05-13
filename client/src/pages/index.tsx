import React from 'react';
import Head from 'next/head';
import { Header } from './partials/Header';
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to MoveEquipment</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <Link href="/adm/dashboard">
              Dashboard
          
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
