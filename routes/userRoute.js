const { Router } = require('express');
const router = Router();

const UserController = require('../controller/userController');

router.get('', [], UserController.get);
router.post('', [], UserController.crear);
router.post('/buscador', UserController.buscador);
router.get('/:id', [], UserController.buscarUser);
router.put('/:id', [], UserController.actualizar);
router.delete('/:id', [], UserController.eliminar);

module.exports = router;