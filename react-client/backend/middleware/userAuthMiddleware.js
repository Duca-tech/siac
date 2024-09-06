// MIDDLEWARE Layer: responsible for handling and processing requests before they reach the controllers.

const jwt = require('jsonwebtoken');

const authenticateToken = (request, response, next) => {
    const token = request.header('Authorization')?.split(' ')[1];
    if (!token) return resquest.status(401).json({ message: 'Access denied!' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        request.user = verified;
        next();
    } catch (error) {
        response.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticateToken };


