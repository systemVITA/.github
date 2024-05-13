import React, { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import userImage from "../../../public/user.svg";
import { getAPIClient } from "../../services/axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Header() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);
  // Adiciona um estado para armazenar se o usuário é um administrador

  const [isAdministrator, setIsAdministrator] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAdministrator(user?.nivelDeAcesso === "administrador");
      const fetchUserData = async () => {
        try {
          const api = getAPIClient();
          const response = await api.get("/auth/me");
          setUserData(response.data.user);
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };
      console.log("Fetching user data...");
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const navigation = isAdministrator
    ? ["Dashboard", "Team", "Projects", "Calendar", "Reports"]  /*aqui ta com erro da rota para o dashboard */
    : ["Team", "Projects", "Calendar", "Reports"];

  const profile = ["Perfil", "Publicações"];

  const handleLogout = () => {
    signOut();
  };


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <span>
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => {
                      const href =
                        item === "Dashboard" && isAdministrator
                          ? "/adm/dashboard"
                          : `/${item.toLowerCase()}`;
                      return (
                        <Link key={item} href={href}>
                          <span
                            className={classNames(
                              item === "Dashboard" && isAdministrator
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                          >
                            {item}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {isAuthenticated ? (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                            src={userData?.perfilImagem || userImage}
                            alt="Imagem de Perfil"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {profile.map((item) => (
                            <Menu.Item key={item}>
                              {({ active }) => (
                                <Link
                                  href="/perfil"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            <a
                              href="#"
                              onClick={handleLogout}
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              Sign out
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <>
                      <Link href="/auth/login">
                        <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                          Login
                        </span>
                      </Link>
                      <Link href="/auth/registro">
                        <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                          Register
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                const href =
                  item === "Dashboard" && isAdministrator
                    ? "/adm/dashboard"
                    : `/${item.toLowerCase()}`;
                return (
                  <Disclosure.Button
                    key={item}
                    as="a"
                    href={href}
                    className={classNames(
                      item === "Dashboard" && isAdministrator
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                  >
                    {item}
                  </Disclosure.Button>
                );
              })}
            </div>

            {isAuthenticated ? (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                      src={userData?.perfilImagem || userImage}
                      alt="User"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {userData?.nomeDeUsuario}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {userData?.email}
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <Disclosure.Button
                      key={item}
                      as="a"
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item}
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                    as="a"
                    href="#"
                    onClick={handleLogout}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link href="/auth/login">
                    <span className="block w-full bg-gray-900 text-white px-4 py-3 rounded-md text-lg font-medium text-center mb-3 hover:bg-gray-700">
                      Login
                    </span>
                  </Link>
                  <Link href="/auth/register">
                    <span className="block w-full bg-gray-900 text-white px-4 py-3 rounded-md text-lg font-medium text-center hover:bg-gray-700">
                      Register
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}


