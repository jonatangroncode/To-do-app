const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.status(200).json(todos);
      } catch (error) {
        console.error('Error fetching todos:', error.message);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
};

const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            userId: req.user.id,
            title: req.body.title,
            items: req.body.items || [],
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error.message);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { $set: req.body },
            { new: true } 
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(todo);
      } catch (error) {
        console.error('Error updating todo:', error.message);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    };

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); 
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
    console.error('Error deleting todo:', error.message);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
