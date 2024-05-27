import express  from 'express';
import  {addUser,loginUser,getPsico,getEmail,updateSenha,getHorario,updateHorario,getUser,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,verificarConsulta,putStatusConsult} from '../helper/sql.js'
const router = express.Router();
import {gerarToken,verificarToken,tokenDestroyer} from '../config/token/token.js'
import {enviarMensagem} from '../config/twilio/twilio.js';
import {session} from '../index.mjs'
import crypto from 'crypto';
import nodemailer from 'nodemailer';

var idUser; // apenas declarando uma variável global...
//Rota para renderizar a pagina principal
router.get('/', (req, res) => {
    res.render('home');
}) 

router.get('/esqueciSenha', (req, res)=>{
    res.render('esqueciSenha');
})

router.post('/esqueciSenha', (req,res)=>{

    console.log('Dados recebidos: ', req.body);
    var {email} = req.body;
    console.log('Email: ', email); 

    getEmail(email, (error, results)=>{

         // Gerar um token exclusivo para essa solicitação de redefinição de senha
         const token = crypto.randomBytes(20).toString('hex');
        console.log('idUser', results[0].idUser);
        idUser = results[0].idUser;
            // Enviar o email com o link de redefinição de senha
        const transporter = nodemailer.createTransport({
            // Configurações do serviço de email (exemplo usando SMTP)
            service: 'gmail',
            auth: {
                user: 'wilsonducattijr@gmail.com',
                pass: 'kvkb iucy iewp azlu',
            },
        });

        console.log('Rotas: ', results[0].email)

        const mailOptions = {
            from: 'wilsonducattijr@gmail.com',
            to: results[0].email,
            subject: 'Link de redefinição de senha',
            text: `Use este link para redefinir sua senha: http://localhost:3600/redefinir-senha/${token}`,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar email:', error);
                res.send('Ocorreu um erro ao enviar o email.');
            } else {
                console.log('Email enviado:', info.response);
                res.status(200).json({message: 'E-mail enviado com Sucesso', results: results[0]});
            }
        });
        
    })


})


router.get('/redefinir-senha/:token', (req,res)=>{
    res.render('redefinirSenha');
})
router.post('/redefinirSenha', (req,res)=>{
    console.log('Dados recebidos da rota redefinir Senha: ', req.body);
    var {senha} = req.body;
    console.log('idUser session: ',idUser);
    var update = {
        senha: senha,
        idUser: idUser
    }
    updateSenha(update, (error, message ,results)=>{
        if(error){
            console.log('Erro na consulta!', error);
        }
        res.status(200).json({message: message, results: results});
    })
})


export {
    router
}
