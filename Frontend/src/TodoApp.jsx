import React, { useState } from "react";
import { login, getTodos, createTodo, deleteTodo, updateTodo, setAuthToken } from "./api";
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

    const [editId, setEditId] = useState(null)
    const [editTitle, setEditTitle] = useState("")

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

    const handleUpdate = async (id) => {
        if (!editTitle.trim()) return;
        setLoading(true);
        setError("");
        try {
            await updateTodo(id, {
                title: editTitle
            });
            setEditId(null);
            setEditTitle("");
            fetchTodos();
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update todo");
        } finally {
            setLoading(false);
        }
    }

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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6">
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Todo App</h1>
                {loading && <div className="text-gray-600 mb-2">Loading...</div>}
            {!token ? (
                <div className="flex flex-col items-center justify-center w-full min-h-[50vh]">
                {showRegister ? (
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
                        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-sm mb-4">
                            <input
                                className="border p-2 mb-2 w-full "
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
                )}
                </div>
            ) : (
                <>
                    <form onSubmit={handleAdd} className="flex gap-0 mb-6 w-full max-w-3xl">
                        <input
                            className="flex-1 border border-gray-300 p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                            type="text"
                            placeholder="Add a new todo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button className="bg-purple-600 text-white px-5 py-3 rounded-r-md hover:bg-purple-700" type="submit" disabled={loading}>
                            Add
                        </button>
                    </form>

                    <ul className="w-full space-y-3">
                        {todos.length === 0 ? (
                            <li className="text-gray-600">No todos yet. Add your first task.</li>
                        ) : (
                            todos.map((todo) => (
                                <li key={todo._id} className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex items-center justify-between">
                                    {editId === todo._id ? (
                                        <div className="flex-1 flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <button onClick={() => handleUpdate(todo._id)} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                                            <button
                                                onClick={() => {
                                                    setEditId(null);
                                                    setEditTitle("");
                                                }}
                                                className="px-3 py-1 rounded border"
                                            >Cancel</button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-gray-800">{todo.title}</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditId(todo._id);
                                                        setEditTitle(todo.title);
                                                    }}
                                                    className="text-sm text-indigo-600 hover:underline"
                                                >Edit</button>

                                                <button
                                                    onClick={() => handleDelete(todo._id)}
                                                    disabled={loading}
                                                    className="text-sm text-red-600 hover:underline"
                                                >Delete</button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </>
            )}
        </div>
        </div>
    );
}

