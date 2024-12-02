const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const authenticateToken = require('../middlewares/authenticateToken');


router.post('/', authenticateToken, createTodo);
router.get('/', authenticateToken, getTodos);
router.put('/:id', authenticateToken, updateTodo);
router.delete('/:id', authenticateToken, deleteTodo);

module.exports = router;

