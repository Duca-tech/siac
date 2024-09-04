// CONTROLLER Layer: controllers will handle authentication logic and other operations.

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../model/userModel');

const SECRET_KEY = process.env.JWT_SECRET;

// Function to authenticate user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ message: 'User not found' });

        // Verify password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid password' });

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
