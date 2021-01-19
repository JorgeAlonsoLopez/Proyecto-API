import { Router } from 'express';
import { songController } from '../controllers/song';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'


const router = Router();

router.get('/', songController.todasLasCanciones);

router.get('/:id', songController.cancionPorId);

router.post('/', [

 ], validar, songController.nuevaCancion);

router.put('/:id', [
    
], validar, songController.modificarCancion);

router.delete('/:id', songController.eliminarCancion);


export default router;