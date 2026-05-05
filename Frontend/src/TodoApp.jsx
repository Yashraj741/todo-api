import React, { useState } from "react";
import { login, getTodos, createTodo, deleteTodo, setAuthToken } from "./api";
import Register from "./Register";

export default function TodoApp() {
    const [token, setToken] = useState("");
    const [todos, setTodos] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [loading, setLoading] = useState(false);


    // Fetch todos when token changes (login/logout)
    const fetchTodos = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getTodos();
            setTodos(res.data.data);
        } catch (error) {
            setError("Failed to fetch todos");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        let ignore = false;
        const fetchAndSetTodos = async () => {
            if (token) {
                setAuthToken(token);
                try {
                    setLoading(true);
                    setError("");
                    const res = await getTodos();
                    if (!ignore) setTodos(res.data.data);
                } catch (error) {
                    if (!ignore) setError("Failed to fetch todos");
                } finally {
                    if (!ignore) setLoading(false);
                }
            } else {
                setTodos([]);
            }
        };
        fetchAndSetTodos();
        return () => { ignore = true; };
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await login({ email, password });
            setToken(res.data.token);
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };


    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await createTodo({ title });
            setTitle("");
            fetchTodos();
        } catch (error) {
            setError("Failed to add todo");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        setError("");
        try {
            await deleteTodo(id);
            fetchTodos();
        } catch (error) {
            setError("Failed to delete todo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-4 bg-blue-200 rounded-xl p-2">Todo App</h1>
            {loading && <div className="text-gray-600 mb-2">Loading...</div>}
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
                            <button className="bg-purple-600 text-white px-4 py-2 rounded w-full" type="submit" disabled={loading}>
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
                            disabled={loading}
                        />
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-r" type="submit" disabled={loading}>
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
                                    disabled={loading}
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

