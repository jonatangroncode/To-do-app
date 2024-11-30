const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); 

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
      const todo = new Todo({
        title: req.body.title,
        items: req.body.items || [],
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
