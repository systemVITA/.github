import React, { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AuthContext } from '../../../contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import userImage from '../../../../public/user.svg';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function Dropdown({ user, profile }) {
    const { signOut } = useContext(AuthContext); // Use a função signOut do contexto

    const handleLogout = (event) => {
        event.preventDefault(); // Previne o comportamento padrão do link
        signOut(); // Chama a função de logout
    };

    return (
        <Menu as="div" className="ml-3 relative">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <Image
                                className="h-8 w-8 rounded-full"
                                src={user?.perfilImagem || userImage}
                                alt=""
                                width={40} // Ajuste conforme necessário
                                height={40} // Ajuste conforme necessário
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            {profile.map((item) => (
                                <Menu.Item key={item}>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                        >
                                            {item}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                <Link
                                    href="/"
                                    onClick={handleLogout} // Adicione o manipulador de eventos aqui
                                    className='block px-4 py-2 text-sm text-gray-700'
                                >
                                    Sign out
                                </Link>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}
