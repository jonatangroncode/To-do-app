import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { name: newItem, checked: false }]);
      setNewItem("");
    }
  };
  
  
  const addTodo = () => {
    if (newTodo.trim()) {
      axios
        .post(
          "http://localhost:3000/api/todos",
          { title: newTodo, items },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo("");
          setItems([]);
        })
        .catch((error) => console.error(error));
    }
  };
  
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((error) => console.error(error));
  };
  

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter Todo Title"
      />

      <h3>Items for this Todo:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter Item"
      />
      <button onClick={addItem}>Add Item</button>

      <button onClick={addTodo}>Add Todo</button>

      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.title}</strong>
            <ul>
              {todo.items.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
            <button onClick={() => deleteTodo(todo._id)}>Delete Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
