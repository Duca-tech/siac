const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userAuthenticationModel');

// Função de login:
const loginUser = async (request, response) => {
    const { email, password } = request.body;
    try {
        // Verify if user exists:
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return response.status(401).json({ message: 'Email ou senha incorretos!' });
        }

        // Verify password:
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Email ou senha incorretos!' });
        }

        // Fetch user profile and permissions:
        const userPermissions = await userModel.getUserProfileAndPermissions(user.idUser);
        if (!userPermissions || userPermissions.length == 0) {
            return response.status(404).json({ message: 'Perfil ou permissões não encontrados.' });
        }

        const permissions = userPermissions.map(permission => permission.permissao);
        const profile = userPermissions[0].perfil;

        // Generate JWT token (with user permissions):
        const token = jwt.sign(
            { idUser: user.idUser, profile, permissions },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return token:
        response.status(200).json({ token });
    } catch (error) {
        // Verify error type:
        if (error.message.includes('senha')) {
            return response.status(401).json({ message: 'Email ou senha incorretos!' });
        } else if (error.message.includes('perfil') || error.message.includes('permissões')) {
            return response.status(404).json({ message: 'Perfil ou permissões não encontrados.' });
        } else {
            return response.status(500).json({ message: 'Erro no processo de autenticação.' });
        }
    }
};

module.exports = { loginUser };
