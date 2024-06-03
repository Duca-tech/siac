import express  from 'express';
import  {addUser,loginUser,getPsico,getHorario,updateHorario, getHoursPac, relatorioPac,getUser,verificarPerfil,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,verificarConsulta,putStatusConsult} from '../helper/sql.js'
const routerPsico = express.Router();
import {gerarToken,verificarToken,tokenDestroyer} from '../config/token/token.js'
import {enviarMensagem} from '../config/twilio/twilio.js';
import session from 'express-session';


// -------------------- INÍCIO DA CONFIGURAÇÃO DE ROTAS DO PSICÓLOGO:
routerPsico.post('/agenda/exibirAgenda', (req, res) => {
    console.log('Dados Recebidos: ', req.body);
    var { idPsico } = req.body;
    var perfil = req.session.perfil;
    getPsicoAgenda(idPsico, perfil,(error, results) => {
        if (results.length == 0) return res.status(200).json({ message: 'Resultado da consulta vazio ', results:results})
        res.status(200).json({agenda: results });
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

routerPsico.get('/prontuario', verificarToken, (req,res)=>{
    res.render('usuario/psicologo/prontuario')
})

routerPsico.post('/relatorio/listarUser', (req,res)=>{
    console.log('Resposta do Servior: ', req.body);
    var idPsico = req.body.idPsico;
    relatorioPac(idPsico, (error, results)=>{
        console.log('banco: ', results);
        res.status(200).json({message:'requisição chegou', results: results});

    })
    

})
var idPaciente;
routerPsico.get('/relatorio/detalhePaciente', (req,res)=>{
    console.log('idPaciente: ', req.query.idPac);
    idPaciente = req.query.idPac;
    res.render('usuario/psicologo/detalheProntuarioUser');
})

routerPsico.get('/relatorio/detalhePaciente/consultas', (req,res)=>{
    getHoursPac(idPaciente, (error, results)=>{
        res.status(200).json({message: 'oi', results: results});
    })
})
// -------------------- FIM DA CONFIGURAÇÃO DE ROTAS PARA PSICÓLOGO!


export{
    routerPsico
}