import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import Dadoscontrollers from '../controllers/DadosController';


const router = Router();

router.post('/user/createUser',UserController.createUser);
router.post('/user/session', AuthController.authUser);
router.post('/createDados', Dadoscontrollers.createDados);
router.get('/listDados/:id', Dadoscontrollers.listDados);
router.put('/updateDados', Dadoscontrollers.updateDados);
router.delete('/deleteDados', Dadoscontrollers.deleteDados);
router.get('/logs',Dadoscontrollers.logs);

export default router;