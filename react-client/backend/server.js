require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Rotes
app.use('/api/users', userRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
