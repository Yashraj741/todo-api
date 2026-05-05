const Todo = require("../models/Todo");

// CREATE
exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const todo = await Todo.create({
            title,
            user: req.user
        });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// GET (Pagination + Search)
exports.getTodos = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = "", completed } = req.query;
        const query = {
            user: req.user,
            title: { $regex: search, $options: "i" }
        };
        if (completed !== undefined) {
            query.completed = completed === "true";
        }
        const todos = await Todo.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        const total = await Todo.countDocuments(query);
        res.json({
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: todos
        });
    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// UPDATE
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Todo ID" });
        }
        const todo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user },
            req.body,
            { returnDocument: 'after' }
        );
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// DELETE
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Todo ID" });
        }
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};