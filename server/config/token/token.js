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
var verificarToken = async (req, res, next) => {
    const token = req.session.token;
      
    const chaveSecreta = process.env.JWT_SECRET_KEY;
    
    console.log('Chave secreta: ', chaveSecreta);
    console.log('Token: ', token)
    
    if (!token) return res.status(500).redirect('/')
    jwt.verify(token, chaveSecreta, (err, decode) => {  // Utilizar o split pois envia a solicitação como Bearer e o token de modo a dividir as duas coisas.
        if (err) return res.status(500).redirect('/');
        
        console.log('Token decodificado: ', decode);
        next();
    });
}

function tokenDestroyer() {}

export { gerarToken, verificarToken, tokenDestroyer };