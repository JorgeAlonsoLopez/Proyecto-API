import { Router } from 'express';
import { listController } from '../controllers/list';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'


const router = Router();

router.get('/', listController.todasLasListasPorUsuario);

router.get('/:id', listController.listaPorId);

router.post('/', [
    
], validar, listController.nuevaLista);

router.put('/:id', [
    
], validar, listController.modificarLista);

router.delete('/:id', listController.eliminarLista);

router.post('/:id1/songs/:id2', listController.anyadirCancion);

router.delete('/:id1/songs/:id2', listController.eliminarCancion);

router.get('/:id1/songs/:id2', listController.obtenerCancion);

router.get('/:id/songs/', listController.listarTodasCanciones);


export default router;