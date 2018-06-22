
const express = require('express');
const router = express.Router();

const controller = require('./../controllers/userController')


// busca o usuários pelo id
router.get('/:id', controller.get);

 // cria o usuário
router.post('/', controller.create);

 // atualiza o usuário
router.put('/:id', controller.update);

// deleta o usuário
router.delete('/:id', controller.delete);


module.exports = router;