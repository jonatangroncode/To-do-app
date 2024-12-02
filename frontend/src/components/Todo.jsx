import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/Todo.css'


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); 
  const [editTitle, setEditTitle] = useState(""); 
  const [editItems, setEditItems] = useState([]);

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

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditTitle(todo.title);
    setEditItems(todo.items);
  };

  const saveTodo = (id) => {
    axios
      .put(
        `http://localhost:3000/api/todos/${id}`,
        { title: editTitle, items: editItems },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
        setEditingTodo(null); 
      })
      .catch((error) => console.error("Error updating todo:", error));
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
      {editingTodo === todo._id ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit Title"
          />
          <ul>
            {editItems.map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...editItems];
                    newItems[index].name = e.target.value;
                    setEditItems(newItems);
                  }}
                />
              </li>
            ))}
          </ul>
          <button onClick={() => saveTodo(todo._id)}>Save</button>
          <button onClick={() => setEditingTodo(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <strong>{todo.title}</strong>
          <ul>
            {todo.items.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <button onClick={() => startEditing(todo)}>Edit</button>
        </div>
      )}
       <button onClick={() => deleteTodo(todo._id)}>Delete Todo</button>

    </li>
  ))}
</ul>


    </div>
  );
};

export default Todo;
