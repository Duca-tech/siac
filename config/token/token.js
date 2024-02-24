const jwt = require('jsonwebtoken');
require('dotenv').config

//função de gerar token
const  gerarToken = async(user)=>{
    try{
        const chaveSecreta = process.env.JWT_SECRET_KEY;
        //gera o token e expira em 1 hora
        token = await jwt.sign({user}, chaveSecreta, {expiresIn: '1h'}) //utilizar then() só pode ser usado em valores promises
        return token;
    }
    catch(error){
        console.log('Falha na Geração de Token!', error);
    }
     
}


//função de verificar token
var verficarToken = async(req,res,next) =>{
    const token = req.headers['authorization'];
    
    const chaveSecreta = process.env.JWT_SECRET_KEY;
    console.log('chave secreta: ',chaveSecreta);
    console.log('token: ', token )
    if(!token) return console.log('Token Indefinido ');
    jwt.verify(token.split(' ')[1], chaveSecreta, (err,decode)=>{  // utilizar o split pois envia a solicitação como Bearer e o token de modo a dividir as duas coiss
        if(err) return res.status(500).json({auth:false, message: 'Falha ao autenticar token', err});
        
        console.log('token decodificado: ', decode);
        next();
    });

}

function tokenDestroyer(){

}

module.exports = {
    gerarToken,
    verficarToken,
    tokenDestroyer
}