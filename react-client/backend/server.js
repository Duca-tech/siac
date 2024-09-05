require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

// Middleware to JSON parsing
app.use(express.json());

// Authentication routes config:
app.use('/auth', authRoutes);

// Inicialize server:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
