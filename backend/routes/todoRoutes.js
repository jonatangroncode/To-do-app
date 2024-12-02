const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const authenticateToken = require('../middlewares/authenticateToken');


router.post('/', authenticateToken, createTodo);
router.get('/', authenticateToken, getTodos);


router.get('/', getTodos);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;

