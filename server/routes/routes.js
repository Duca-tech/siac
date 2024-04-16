import express  from 'express';
import  {addUser,loginUser,getPsico,getEmail,getHorario,updateHorario,getUser,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,verificarConsulta,putStatusConsult} from '../helper/sql.js'
const router = express.Router();
import {gerarToken,verificarToken,tokenDestroyer} from '../config/token/token.js'
import {enviarMensagem} from '../config/twilio/twilio.js';
import session from 'express-session';
import crypto from 'crypto';
import nodemailer from 'nodemailer';


//Rota para renderizar a pagina principal
router.get('/', (req, res) => {
    res.render('home');
}) 

router.get('/esqueciSenha.ejs', (req, res)=>{
    res.render('esqueciSenha');
})

router.post('/esqueciSenha', (req,res)=>{

    console.log('Dados recebidos: ', req.body);
    var {email} = req.body;
    console.log('Email: ', email); 

    getEmail(email, (error, results)=>{

         // Gerar um token exclusivo para essa solicitação de redefinição de senha
         const token = crypto.randomBytes(20).toString('hex');

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
            to: email,
            subject: 'Link de redefinição de senha',
            text: `Use este link para redefinir sua senha: http://localhost:3600/redefinir-senha/${token}`,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar email:', error);
                res.send('Ocorreu um erro ao enviar o email.');
            } else {
                console.log('Email enviado:', info.response);
                res.send('Email enviado com sucesso. Verifique sua caixa de entrada.');
            }
        });
        
    })


})


router.get('/redefinir-senha/:token', (req,res)=>{
    var {token} = req.params;
    res.render('redefinirSenha');
})


export {
    router,
    session
}
