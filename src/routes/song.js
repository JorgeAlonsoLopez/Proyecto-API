import { Router } from 'express';
import { songController } from '../controllers/song';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { token } from '../services/passport';


const router = Router();

router.get('/', token(), songController.todasLasCanciones);


router.get('/:id', [ param('id').isInt().withMessage('ID debe ser un número entero') ], token(), songController.cancionPorId);


router.post('/', [

 ], validar, token(), songController.nuevaCancion);


router.put('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
    
], validar, token(), songController.modificarCancion);


router.delete('/:id', [ param('id').isInt().withMessage('ID debe ser un número entero') ], token(), songController.eliminarCancion);



export default router;