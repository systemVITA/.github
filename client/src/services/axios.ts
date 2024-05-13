// import axios from "axios";
// import { parseCookies } from "nookies";

// export function getAPIClient(ctx?: any) {
//   const { 'token': token } = parseCookies(ctx)

//   const api = axios.create({
//     withCredentials: true,
//     baseURL: 'http://localhost:3001'

//     // Incluir cookies nas solicitações
//   })

//   api.interceptors.request.use(config => {
//     console.log(config);

//     return config;
//   })

//   if (token) {
//     api.defaults.headers['Authorization'] = `Bearer ${token}`;
//   }

//   return api;
// }
// services/axios.js
import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { 'token': token } = parseCookies(ctx)

  const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001'
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
