import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";

export const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:7777/todo", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setTodos(response.data.allTodos || []);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addTodo() {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:7777/todo",
      {
        description: newTodo,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setNewTodo("");
    fetchTodos();
  }

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:7777/todo/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    fetchTodos();
  };

  return (
    <div>
      <InputBox
        placeholder={"What's on your mind today"}
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <div className="pt-4">
        <Button label={"Add Todo"} onClick={addTodo} />
      </div>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <div key={index}>
            <h1>
              {index + 1}. {todo.description}
            </h1>
            <Button
              label={"Delete Todo"}
              onClick={() => {
                deleteTodo(todo._id);
              }}
            />
            <Button
              label={"Update Todo"}
              onClick={() => {
                setNewTodo(todo.description);
                deleteTodo(todo._id);
              }}
            />
          </div>
        ))
      ) : (
        <h2>All set for the day!!</h2>
      )}
    </div>
  );
};
