import React from 'react';
import { Header } from './partials/Header';
import Link from 'next/link';

const PageNotFound = () => {

    return (
        <>
            <Header />
            <span>Pagina não encontrada</span><br/>
            <Link href="/">Voltar ao Home</Link>
        </>
    );
};

export default PageNotFound;