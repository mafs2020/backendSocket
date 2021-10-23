const { Router } = require('express');
const router = Router();

const UserController = require('../controller/userController');

router.get('', [], UserController.get);

module.exports = router;