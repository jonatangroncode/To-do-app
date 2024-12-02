import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todos"
          element={<ProtectedRoute element={<Todo />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
