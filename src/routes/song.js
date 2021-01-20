import { Router } from 'express';
import { songController } from '../controllers/song';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { token } from '../services/passport';


const router = Router();

router.get('/', token(), songController.todasLasCanciones);

router.get('/:id', token(), songController.cancionPorId);

router.post('/', [

 ], validar, token(), songController.nuevaCancion);

router.put('/:id', [
    
], validar, token(), songController.modificarCancion);

router.delete('/:id', token(), songController.eliminarCancion);


export default router;