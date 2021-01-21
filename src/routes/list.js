import { Router } from 'express';
import { listController } from '../controllers/list';
import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion';
import { token } from '../services/passport';


const router = Router();

//! que el campo exista, que no este vacio, el tipo de dato(string, number...)

router.get('/', token(), listController.todasLasListasPorUsuario);


router.get('/:id', [ param('id').isInt().withMessage('ID debe ser un número entero') ], token(), listController.listaPorId);


router.post('/', [
    
], validar, token(), listController.nuevaLista);


router.put('/:id', [
    param('id').isInt().withMessage('ID debe ser un número entero')
    
], validar, token(), listController.modificarLista);


router.delete('/:id', [ param('id').isInt().withMessage('ID debe ser un número entero') ], token(), listController.eliminarLista);


router.post('/:id1/songs/:id2', [
    param('id1').isInt().withMessage('ID1 debe ser un número entero'),
    param('id2').isInt().withMessage('ID2 debe ser un número entero')
 ], token(), listController.anyadirCancion);


router.delete('/:id1/songs/:id2', [
    param('id1').isInt().withMessage('ID1 debe ser un número entero'),
    param('id2').isInt().withMessage('ID2 debe ser un número entero')
 ], token(), listController.eliminarCancion);


router.get('/:id1/songs/:id2', [
    param('id1').isInt().withMessage('ID1 debe ser un número entero'),
    param('id2').isInt().withMessage('ID2 debe ser un número entero')
 ], token(), listController.obtenerCancion);


router.get('/:id/songs/', [ param('id').isInt().withMessage('ID debe ser un número entero') ], token(), listController.listarTodasCanciones);



export default router;