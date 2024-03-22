import express  from 'express';
import  {addUser,loginUser,getPsico,getHorario,updateHorario,getUser,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,getPsicoLogin,verificarConsulta,addPsico,putStatusConsult,addRecep,updateRecep} from '../helper/sql.js'
const routerPsico = express.Router();
import {gerarToken,verficarToken,tokenDestroyer} from '../config/token/token.js'
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


routerPsico.post('/login', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    const { email, senha } = req.body;
    var psicoLogin = {
        email: email,
        senha: senha
    }
    getPsicoLogin(psicoLogin, async (error, results) => {
        if (error) return res.status(500).json({ message: 'Falha ao buscar psicólogo.' });
        console.log('psicólogo router.js: ', results[0]);
        const tokenGerado = await gerarToken(results[0].idPsico);
        console.log('Token: ', tokenGerado);
        res.status(200).json({ message: 'Psicólogo encontrado: ', psico: results[0], message: 'Enviando token... ', token: tokenGerado });
    })
})

routerPsico.get('/cadastro', (req,res)=>{
    res.render('psicologo/cadastro')
})

routerPsico.post('/cadastro', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    const { nome, email, cidade, senha } = req.body
    var psico = {
        nome: nome,
        email: email,
        cidade: cidade,
        senha: senha
    }
    addPsico(psico, (error, results) => {
        if (results.affectedRows > 0) {
            res.status(201).json({ message: 'Psicólogo adicionado com sucesso!', results: results });
        }
        else {
            res.status(200).json({ message: 'Já existe um psicólogo com esse cadastro.', results: results })
        }
    })
})

routerPsico.get('/principal/verificarToken', verficarToken, (req, res) => {
    res.status(200).json({ message: 'Token validado com sucesso!' })
})

routerPsico.get('/principal', (req, res) => {
    res.render('psicologo/principal');
})

routerPsico.get('/principal/agenda', (req, res) => {
    res.render('psicologo/agenda');
})
// -------------------- FIM DA CONFIGURAÇÃO DE ROTAS PARA PSICÓLOGO!


export{
    routerPsico
}