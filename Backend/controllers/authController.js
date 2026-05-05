const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ message: "Request body is missing or invalid" });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User exists" });

        const hashed = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashed });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
