import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Navbar } from "../components/Navbar";

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

  const addTodo = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:7777/todo",
      { description: newTodo },
      { headers: { Authorization: "Bearer " + token } }
    );
    setNewTodo("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:7777/todo/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
      <Navbar />
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-blue-400 mb-6">
          LessGo
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          />
          <button
            onClick={addTodo}
            className="w-full mt-4 p-3 bg-blue-600 rounded-lg shadow-md text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Todo
          </button>
        </div>
        {todos.length > 0 ? (
          <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-800 rounded-lg shadow-md space-y-2 sm:space-y-0"
              >
                <h2 className="text-sm sm:text-lg font-semibold text-gray-200">
                  {index + 1}. {todo.description}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 hover:scale-110 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => {
                      setNewTodo(todo.description);
                      deleteTodo(todo._id);
                    }}
                    className="p-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 hover:scale-110 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-gray-500 text-lg mt-6">
            All set for the day!
          </h2>
        )}
      </div>
    </div>
  );
};
