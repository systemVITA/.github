import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

export default function Registro() {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      e.target.value = "Não afiliado";
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [senhaMatch, setSenhaMatch] = useState(true); // Estado para controlar se a senha e a confirmação de senha correspondem

  const handlePasswordMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmarSenha = e.target.value;
    const senha = e.target.form["password"].value;
    setSenhaMatch(senha === confirmarSenha);
  };

  // Carregar países ao iniciar o componente
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/paises",
          {
            params: { orderBy: "nome" },
          }
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchStates() {
      if (selectedCountry) {
        try {
          const response = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados`,
            {
              params: { orderBy: "nome" },
            }
          );
          setStates(response.data);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      } else {
        setStates([]);
        setSelectedState("");
      }
    }
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    async function fetchCities() {
      if (
        selectedState &&
        typeof selectedState !== "string" &&
        selectedState.id
      ) {
        try {
          const response = await axios.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios`
          );
          console.log(response.data);
          setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setCities([]);
        setSelectedCity("");
      }
    }
    fetchCities();
  }, [selectedState]);

  // Função para lidar com o registro do usuário
  async function handleRegister(data) {
    try {
      const selectedStateName = selectedState.nome;
      console.log(selectedStateName);
      // Combine os dados do usuário com os dados selecionados de país, estado e cidade
      const userData = {
        ...data,
        pais: selectedCountry,
        estado: selectedStateName,
        cidade: selectedCity,
      };

      // Envie os dados do usuário para o servidor
      await axios.post("http://localhost:3001/auth/register", userData);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error(error);
      setError("registrationFailed", {
        type: "manual",
        message:
          "Falha no registro: " +
          (error.response?.data?.error || "Erro desconhecido"),
      });
    }
  }

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para alternar a visibilidade da confirmação de senha
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registro efetuado com sucesso!
        </h2>
        <p className="mt-2 text-center text-md text-gray-600">
          Por favor,{" "}
          <Link href="/auth/login">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              faça login
            </span>
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-4 gap-1"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Campo de nome de usuário */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nome de Usuário:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                {...register("nomeDeUsuario", { required: true })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
              />
            </div>
            {/* Campo de e-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...register("email", { required: true })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
              />
            </div>
            {/* Campo de senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha:
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("senha", { required: true })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.6 14.6A8 8 0 003.4 8.4m2.8 2.8a8 8 0 0010.8 10.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Campo de confirmar senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", { required: true })}
                  onChange={(e) => {
                    handlePasswordMatch(e);
                    handleInputChange(e); // Se quiser tratar a entrada para "Não afiliado" quando vazio
                  }}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.6 14.6A8 8 0 003.4 8.4m2.8 2.8a8 8 0 0010.8 10.8"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {!senhaMatch && (
                <p className="mt-2 text-center text-sm text-red-600">
                  A senha e a confirmação de senha devem ser idênticas.
                </p>
              )}
            </div>

            {/* Select de seleção de país */}

            <div className="flex items-center gap-5 mt-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                País:
              </label>
              <select
                {...register("country")}
                id="country"
                name="country"
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  console.log(e.target.value); // Exibe o valor selecionado no console
                }}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione seu País</option>
                {countries.map((country) => (
                  <option key={country.nome} value={country.nome}>
                    {country.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional rendering for State and City selects */}
            {selectedCountry === "Brasil" && (
              <div>
                {/* Conditional rendering for State select */}
                {states.length > 0 && (
                  <div className="flex items-center gap-5">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Estado:
                    </label>
                    <select
                      {...register("state")}
                      id="state"
                      name="state"
                      onChange={(e) => {
                        const estadoId = e.target.value;
                        const estado = states.find(
                          (state) => state.id.toString() === estadoId
                        );
                        setSelectedState(estado); // Armazena o objeto estado inteiro
                      }}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Selecione seu Estado</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Conditional rendering for City select */}
                {cities.length > 0 && (
                  <div className="flex items-center gap-5">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cidade:
                    </label>
                    <select
                      {...register("city")}
                      id="city"
                      name="city"
                      onChange={(e) => {
                        const cidadeId = e.target.value;
                        const cidade = cities.find(
                          (city) => city.id.toString() === cidadeId
                        );
                        setSelectedCity(cidade?.nome || "");
                      }}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Selecione sua</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/*Campo de Instituição*/}
          <div>
            <label
              htmlFor="instituicao"
              className="block text-sm font-medium text-gray-700"
            >
              Instituição:
            </label>
            <input
              id="instituicao"
              name="instituicao"
              type="text"
              {...register("instituicao")}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <span className="text-xs text-gray-500">
              Deixe em branco para ser preenchido como não afiliado.
            </span>
          </div>

          {/* Exibir mensagem de erro se os termos de uso não forem aceitos */}
          {errors.termosDeUso && (
            <p className="mt-2 text-center text-sm text-red-600">
              Você deve concordar com os termos de uso.
            </p>
          )}

          {/* Exibir mensagem de erro se o registro falhar */}
          {errors.registrationFailed && (
            <p className="mt-2 text-center text-sm text-red-600">
              {typeof errors.registrationFailed.message === "string"
                ? errors.registrationFailed.message
                : "Ocorreu um erro durante o registro. Tente novamente mais tarde."}
            </p>
          )}

          {/* Agreement checkbox */}
          <div className="flex items-center p-2">
            <input
              type="checkbox"
              id="termosDeUso"
              {...register("termosDeUso", { required: true })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="termosDeUso"
              className="ml-2 block text-sm text-gray-900"
            >
              Concordo com os{" "}
              <Link href="/termos-de-uso">
                <span className="text-indigo-600 hover:text-indigo-500">
                  termos de uso
                </span>
              </Link>
              .
            </label>
          </div>

          <div className="flex items-center p-2">
            <span className="font-medium">
              Já possuí conta? &nbsp;
              <Link className="font-medium text-indigo-600 hover:text-indigo-500 text-sm" href="/auth/login">
                Clique aqui e faça o login.
              </Link>
            </span>
          </div>

          {/* Botão de registro */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={
                !isDirty ||
                !selectedCountry ||
                (selectedCountry.nome === "Brazil" && !selectedState) ||
                (selectedState && !selectedCity)
              }
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
