import express  from 'express';
import  {addUser,loginUser,getPsico,getHorario,updateHorario,getUser,verificarPerfil,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,verificarConsulta,putStatusConsult} from '../helper/sql.js'
const routerPsico = express.Router();
import {gerarToken,verificarToken,tokenDestroyer} from '../config/token/token.js'
import {enviarMensagem} from '../config/twilio/twilio.js';
import session from 'express-session';


// -------------------- INÍCIO DA CONFIGURAÇÃO DE ROTAS DO PSICÓLOGO:
routerPsico.post('/agenda/exibirAgenda', (req, res) => {
    console.log('Dados Recebidos: ', req.body);
    var { idPsico } = req.body;
    console.log('Id psico: ', idPsico);
    getPsicoAgenda(idPsico, (error, results) => {
        if (results.length == 0) return res.status(200).json({ message: 'Resultado da consulta vazio ', results:results})
        res.status(200).json({ message: 'Usuario encontrado!', agenda: results });
    })
})

routerPsico.post('/gerarAgenda', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    const { horaIni, horaFin, diaSemana, data, idPsico } = req.body;
    var agenda = {
        horaIni: horaIni,
        horaFin, horaFin,
        diaSemana, diaSemana,
        data: data,
        idPsico: idPsico
    }
    console.log('Agenda: ', agenda);
    addAgenda(agenda, (error, results) => {
        if (error) return res.status(400).json({ message: 'Erro na consulta: ', error: error });
        else if (results.agenda) {
            console.log('Agenda inserida route.js: ', results.agenda);
            if (results.horas.length > 0) {
                console.log('Horaáios adicionados route.js: ', results.horas);
                res.status(200).json({ message: 'Agendas adicionadas: ', agenda: results.agenda, message: 'Horarios Adicionados: ', horarios: results.horas });
            }
            else {
                res.status(400).json({ message: 'Horários não foram adicionados ou não estão no array.' });
            }
        }
        else {
            res.status(401).json({ message: 'Agenda não inserida.' });
        }
    })
})

routerPsico.delete('/agenda/deletarAgenda/:idAgenda', (req, res) => {
    console.log('Id para deleção: ', req.params.idAgenda);
    var idAgenda = req.params.idAgenda;

    deleteAgenda(idAgenda, (error, results) => {
        res.status(200).json({ message: 'Agenda foi excluida com sucesso: ', data: results });
    })
})



routerPsico.get('/principal/verificarToken/:idUser', verificarToken, (req, res) => {
    var idUser = req.params.idUser;
    console.log('IdUser servidor: ', idUser);
    verificarPerfil(idUser, (error, results)=>{
        
        Console.log('Results: ',results);
        res.status(200).json({message: 'Resposta do Servidor a results ', data: results})
    })
})
    
    



routerPsico.get('/principal/agenda', verificarToken, (req, res) => {
    res.render('usuario/psicologo/agenda');
})
// -------------------- FIM DA CONFIGURAÇÃO DE ROTAS PARA PSICÓLOGO!


export{
    routerPsico
}