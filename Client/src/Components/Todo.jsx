import { useState, useEffect } from "react";

import "./Todo.css";

const fetchQuery = async ({ uri, method = "GET", body = null }) => {
  const response = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== null ? JSON.stringify(body) : null,
  });
  const data = await response.json();
  return data;
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuery({
        uri: "http://localhost:4000/todo",
      });
      setTodos(data.todos);
    };
    fetchData();
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      text: todo,
      completed: false,
    };

    const data = await fetchQuery({
      uri: "http://localhost:4000/todo",
      method: "POST",
      body: newTodo,
    });
    setTodos([data, ...todos]);

    setTodo("");
  };

  const toggleCompleted = async (id) => {
    const data = await fetchQuery({
      uri: `http://localhost:4000/todo/${id}/toggle`,
      method: "PATCH",
    });
  };

  const deleteTodo = async (id) => {
    const data = await fetchQuery({
      uri: `http://localhost:4000/todo/${id}`,
      method: "DELETE",
    });
  };

  const updateTodo = async (id) => {
    const newTodos = todos.filter((todo) => {
      return todo._id !== id;
    });
    setTodos(newTodos);
  };

  return (
    <div className="todo">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          placeholder="add todo"
          onChange={handleChange}
        />
        <button type="submit"> Add Todo</button>
      </form>
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <span className="btns">
              <button onClick={() => toggleCompleted(todo._id)}>
                {todo.completed ? "Completed" : "Incompleted"}
              </button>
              <button onClick={() => updateTodo(todo._id)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
