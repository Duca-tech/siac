// CONTROLLER Layer: controllers will handle authentication logic and other operations.

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Login function:
const login = async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return response.status(401).json({ message: 'Incorrect email or password!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Incorrect email or password!' });
        }

        // Generate JWT token:
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '60min' });

        response.json({ token });
    } catch (error) {
        response.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
