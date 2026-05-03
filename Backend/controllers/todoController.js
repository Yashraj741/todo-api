const Todo = require("../models/Todo");

// CREATE
exports.createTodo = async (req, res) => {
    const todo = await Todo.create({
        title: req.body.title,
        user: req.user
    });
    res.json(todo);
};

// GET (Pagination + Search)
exports.getTodos = async (req, res) => {
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
};

// UPDATE
exports.updateTodo = async (req, res) => {
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
};

// DELETE
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid Todo ID" });
    }
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user });
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Deleted" });
};