import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

// Função de gerar token:
const gerarToken = async (user) => {
    try {
        const chaveSecreta = process.env.JWT_SECRET_KEY;
        
        // Gera o token e expira em 1 hora:
        var token = await jwt.sign({ user }, chaveSecreta, { expiresIn: '1h' }) // Utilizar then() só pode ser usado em valores promises.
        
        return token;
    }
    catch (error) {
        console.log('Falha na geração do token.', error);
    }
}


// Função de verificar token:
var verficarToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    const chaveSecreta = process.env.JWT_SECRET_KEY;
    
    console.log('Chave secreta: ', chaveSecreta);
    console.log('Token: ', token)
    
    if (!token) return console.log('Token indefinido.');
    jwt.verify(token.split(' ')[1], chaveSecreta, (err, decode) => {  // Utilizar o split pois envia a solicitação como Bearer e o token de modo a dividir as duas coisas.
        if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar token', err });
        
        console.log('Token decodificado: ', decode);
        next();
    });
}

function tokenDestroyer() {}

export { gerarToken, verficarToken, tokenDestroyer };