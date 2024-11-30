import React, { useState, useEffect } from "react";
import axios from "axios";


const Todo = () => {
 const [todos, setTodos] = useState([]);

 useEffect(() => {
   axios.get("http://localhost:3000/api/todos")
     .then(response => setTodos(response.data))
     .catch(error => console.error(error));
 }, []);

 return (
   <div>
     <h1>Todo App</h1>

     <h2>Todos</h2>
     <ul>
       {todos.map(todo => (
         <li key={todo._id}>
           <strong>{todo.title}</strong>
           <ul>
             {todo.items.map((item, index) => (
               <li key={index}>{item.name}</li>
             ))}
           </ul>
         </li>
       ))}
     </ul>
   </div>
 );
};


export default Todo;