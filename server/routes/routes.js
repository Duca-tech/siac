import express  from 'express';
import  {addUser,loginUser,getPsico,getHorario,updateHorario,getUser,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,getPsicoLogin,verificarConsulta,addPsico,putStatusConsult,addRecep,updateRecep} from '../helper/sql.js'
const router = express.Router();
import {gerarToken,verficarToken,tokenDestroyer} from '../config/token/token.js'
import {enviarMensagem} from '../config/twilio/twilio.js';
import session from 'express-session';

//Rota para renderizar a pagina principal
router.get('/', (req, res) => {
    res.render('home');
})



export {
    router,
    session
}
