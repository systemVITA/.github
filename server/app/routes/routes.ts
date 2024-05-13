import { Router } from "express";
import  {registerUser}  from "../controllers/contextAutenticate/registerUser";
import { loginUser } from "../controllers/contextAutenticate/loginUser";
import { deleteUser } from "../controllers/contextAdm/deleteUser"
import { getUsersAll} from "../controllers/contextAdm/getUserAll"
import { getUserById } from "../controllers/contextAdm/getUserById";
import { logoutUser } from "../controllers/contextAutenticate/logoutUser";
import auth  from "../middleware/auth";
import  user  from "../middleware/user"
import  me  from "../controllers/contextAutenticate/me"
import adm from "../middleware/adm";
import { updateUser } from "../controllers/contextAdm/updateUser";

import { updateMe } from "../controllers/contextUser/updateMe";


import  getMeById  from "../controllers/contextUser/getMeById";


const routes = Router();

//Rotas de Autenticação 
routes.post("/auth/register",registerUser);
routes.post("/auth/login",loginUser);
routes.get("/auth/me", me)
routes.get("/auth/logout", logoutUser);


// Contexto de Administrador
routes.put("/adm/users/profile/:id_user",user, auth,adm, updateUser);
routes.get("/adm/users/profile/:id_user", user, auth, adm, getUserById );
routes.get("/adm/users", user, auth, adm, getUsersAll);
routes.delete("/adm/users/:id_user",user, auth,adm, deleteUser);

// Contexto de Usuário
routes.get("/users/profile/", user, auth, getMeById );
routes.put("/users/profile/",user, auth, updateMe);


routes.get('/',me,(_,res)=> res.send('Hello World'))
export default routes;