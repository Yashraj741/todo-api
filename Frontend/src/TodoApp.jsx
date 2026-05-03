import React, { useState } from "react";
import { register, login, getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import Register from "./Register";

export default function TodoApp() {
    const [token, setToken] = useState("");
    const [todos, setTodos] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            setToken(res.data.token);
            setError("");
            fetchTodos(res.data.token);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    const fetchTodos = async (tk = token) => {
        try {
            const res = await getTodos(tk);
            setTodos(res.data.data);
        } catch (err) {
            setError("Failed to fetch todos");
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await createTodo(token, { title });
            setTitle("");
            fetchTodos();
        } catch (err) {
            setError("Failed to add todo");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(token, id);
            fetchTodos();
        } catch (err) {
            setError("Failed to delete todo");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-4">Todo App</h1>
            {!token ? (
                showRegister ? (
                    <>
                        <Register onRegister={() => setShowRegister(false)} />
                        <button
                            className="mt-4 text-blue-600 hover:underline"
                            onClick={() => setShowRegister(false)}
                        >
                            Already have an account? Login
                        </button>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-xs mb-4">
                            <input
                                className="border p-2 mb-2 w-full"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className="border p-2 mb-2 w-full"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" type="submit">
                                Login
                            </button>
                            {error && <div className="text-red-500 mt-2">{error}</div>}
                        </form>
                        <button
                            className="text-blue-600 hover:underline"
                            onClick={() => setShowRegister(true)}
                        >
                            Don't have an account? Register
                        </button>
                    </>
                )
            ) : (
                <>
                    <form onSubmit={handleAdd} className="flex mb-4">
                        <input
                            className="border p-2 rounded-l"
                            type="text"
                            placeholder="Add todo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-r" type="submit">
                            Add
                        </button>
                    </form>
                    <ul className="w-full max-w-md">
                        {todos.map((todo) => (
                            <li key={todo._id} className="bg-white p-3 mb-2 rounded shadow flex justify-between items-center">
                                <span>{todo.title}</span>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDelete(todo._id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </>
            )}
        </div>
    );
}
