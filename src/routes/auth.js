import { Router } from 'express';
import { body } from 'express-validator';
import { emailExists } from '../models/users';
import { AuthController } from '../controllers/auth';
import { validar } from '../middlewares/validacion';
import { password } from '../services/passport';


const router = Router();

router.post('/register', AuthController.register);


router.post('/login',password(),AuthController.login);


export default router;