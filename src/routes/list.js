import { Router } from 'express';
import { listController } from '../controllers/list';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { token } from '../services/passport';


const router = Router();

router.get('/', token(), listController.todasLasListasPorUsuario);

router.get('/:id', token(), listController.listaPorId);

router.post('/', [
    
], validar, token(), listController.nuevaLista);

router.put('/:id', [
    
], validar, token(), listController.modificarLista);

router.delete('/:id', token(), listController.eliminarLista);

router.post('/:id1/songs/:id2', token(), listController.anyadirCancion);

router.delete('/:id1/songs/:id2', token(), listController.eliminarCancion);

router.get('/:id1/songs/:id2', token(), listController.obtenerCancion);

router.get('/:id/songs/', token(), listController.listarTodasCanciones);


export default router;