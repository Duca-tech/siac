// MIDDLEWARE Layer: responsible for handling and processing requests before they reach the controllers.
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (request, response, next) => {
    const token = request.headers['authorization'];

    if (!token) {
        return response.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        request.user = user;
        next();
    });
};

module.exports = authenticateToken;

