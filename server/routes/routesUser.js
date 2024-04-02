import express  from 'express';
import  {addUser,loginUser,getPsico,getHorario,updateHorario,getUser,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,getPsicoLogin,verificarConsulta,addPsico,putStatusConsult,addRecep,updateRecep} from '../helper/sql.js'
const routerUser = express.Router();
import {gerarToken,verficarToken,tokenDestroyer} from '../config/token/token.js'
import {enviarMensagem} from '../config/twilio/twilio.js';
import session from 'express-session';

// -------------------- INÍCIO DA CONFIGURAÇÃO DE ROTAS DO USUÁRIO:
routerUser.get('/cadastro', (req, res) => {
    res.render('usuario/cadastro');
})

routerUser.get('/buscarEndereco', async (req, res)=>{
    var {cep} = req.query;
    console.log('Cep Server: ', cep);
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`); //fetch para buscar endereço
    const data = await response.json();
    console.log('Data: ', data);
    res.json(data);

})

routerUser.post('/cadastro', async (req, res) => {
    console.log('Dados Recebidos: ', req.body);
    const { nome, email, nomeUser, cep, logradouro, bairro,localidade, uf,numero, senha} = req.body;

    const user = {
        nome: nome,
        email: email,
        nomeUser: nomeUser,
        password: senha
    }

    const end ={
        logradouro: logradouro,
        bairro: bairro,
        localidade: localidade,
        uf: uf,
        numero: numero,
        senha: senha,
        cep: cep
    }

    addUser(user, end, (error, results, usuario) => {
        if (error) {
            console.log('Erro ao adicionar cliente ', error.message);
            res.status(500).send('Erro ao Adicionar Cliente');
        }
        else if (results.affectedRows > 0) {
            console.log('Usuario adicionado com sucesso', usuario);
            
            res.status(201).json({message: 'Usuario e endereço adicionado com sucesso: ', data: results, user: usuario}); // Método send não aceita múltiplos argumentos.
        }
    });

});
routerUser.get('/login', (req, res) => {
    res.render('home')
})

routerUser.post('/login', async (req, res) => {
    console.log('Dados Recebidos:', req.body);
    const { emailUsuario, password } = req.body;

    const user = {
        emailUsuario: emailUsuario,
        password: password
    }

    loginUser(user, async (error, results) => {
        if (error) {
            console.log('Erro de solicitação select.', error.message);
            res.status(500).send('Erro de solicitação no banco de dados.');
        }
        else if (results.length > 0) {
            console.log('Usuário encontrado!', results);
            let tokenGerado = await gerarToken(results[0].idUser);
            console.log('Token gerado:', tokenGerado);

            // Pegando o id do banco e armazenando na requisição id do session.
            req.session.userId = results[0].idUser 
            
            // Armazenando o token na requisiçao token do session.
            req.session.token = tokenGerado;
            console.log('Id da sessão: ', req.session.id);
            const idUser = results[0].idUser;

            res.status(200).json({ message: 'Autenticação realizada e token enviado para o user', auth: true, token: tokenGerado, response: results });
        }
        else {
            console.log('Usuário não encontrado!');
            res.status(400).send('Usuário não encontrado');
        }
    });
})

// Abrir página principal:
routerUser.get('/principal', (req, res) => {
    res.render('usuario/principal');
})

routerUser.get('/principal/verificarToken', verficarToken, (req, res) => {
    res.status(200).json({ message: 'token verificado com Sucesso' });
})

// Verificar token:
routerUser.post('/principal/verificarToken', verficarToken, (req, res) => {
    console.log('dados recebidos: ', req.body);
    var { idUser } = req.body
    
    idUser = parseInt(idUser);
    console.log('int: ', idUser);
    
    getAgenda(idUser, (error, results) => {
        if (error) return res.status(500).json({ message: 'Falha na consulta!' })
        res.status(200).json({ message: 'Enviando dados sobre a consulta: ', data: results });
    })
})

// Abrir página de Agendamento
routerUser.get('/agendamento', (req, res) => {
    res.render('usuario/agendamento');
})

// Pegar dados do psicólogo e agenda, e exibir na tela de agendamento:
routerUser.get('/agendamento/dadosPsico', (req, res) => {

    getPsico((error, results) => {
        if (error) return res.status(400).json({ message: 'Falha ao buscar Consultas' });
        else {
            console.log('Resultado da Consulta: ', results);
            if (results.psicologos.length == 0) return res.status.json({ message: 'Sem psicologos' });
            if (results.agenda.length == 0) return res.status(200).json({ message: 'Sem Agenda!' });
            res.status(200).json({ message: 'Agenda: ', agenda: results.agenda, message: 'Psicologo: ', psicologos: results.psicologos, message: 'Horários: ', horarios: results.horarios })
        }
    })
})

routerUser.post('/principal/agendamento/buscar', (req, res)=>{
    console.log('Dados Recebidos: ', req.body);
    var dados = req.body;
    
    var newDados = {}   
    
    for(var element in dados){
        if(dados.hasOwnProperty(element) && dados[element] !== ''){
            newDados[element] = dados[element];
        }
    }
    console.log('NewDados: ', newDados)
    
})

routerUser.post('/inserirHorario', (req, res) => {
    console.log('dados recebidos: ', req.body)
    var { idUser, hora } = req.body;
    
    idUser = parseInt(idUser);
    var horario = {
        idUser: idUser,
        hora: hora
    }
    console.log('Horario: ', horario);

    getHorario(horario, (error, results) => {
        if (error) return res.status(400).json({ message: 'erro na inserção de dados' })
        else if (results.affectedRows > 0) {
            return res.status(200).json({ message: 'Usuário inserido com sucesso', data: results });
        }
        else {
            return res.status(400).json({ message: 'Nenhuma linha afetada' });
        }
    });
})

routerUser.post('/inserirHorario/wpp', (req, res) => {
    console.log('Dados recebidos: ', req.body)
    var { idUser, hora } = req.body;

    idUser = parseInt(idUser);
    var horario = {
        idUser: idUser,
        hora: hora
    }

    console.log('Horário: ', horario);
    updateHorario(horario, (error, results) => {
        if (error) return res.status(400).json({ message: 'Erro na inserção de dados' })
        else if (results.affectedRows > 0) {
            console.log('Agendamento realizado: ', results);
            res.status(200).json({ message: 'Usuário inserido com sucesso' });
            WppTwilio.enviarMensagem(`
                Prezado usuário, sua consulta foi agendada com sucesso!\n\n 
                
            `).then(() => console.log('Mensagem enviada com sucesso!')).catch((error) => console.log('Falha ao enviar a mensagem para o cliente'))
        }
        else {
            return res.status(400).json({ message: 'Nenhuma linha afetada' });
        }
    });
})

routerUser.get('/principal/conta', (req, res) => {
    res.render('usuario/contaUsuario');
})

routerUser.post('/principal/conta/detalhes', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    
    var idUser = parseInt(req.body.idUser)
    console.log('Inteiro de idUser: ', idUser);

    getUser(idUser, (error, results) => {
        if (error) {
            return res.status(400).json({ message: 'Erro ao consultar o banco.' });
        }
        else if (results) {
            return res.status(200).json({ message: 'Usuário encontrado.', data: results });
        }
        else {
            return res.status(400).json({ message: 'Usuario não encontrado.' });
        }
    })
})

routerUser.put('/principal/conta/update/:idUser', (req, res) => {
    var idUser = req.params.idUser;
    console.log('Id passado na URL: ', idUser);

    console.log('Dados recebidos ', req.body);
    var { nome, email, celular, nomeUser } = req.body;

    var usuario = {
        nome: nome,
        email: email,
        celular: celular,
        nomeUser: nomeUser,
        idUser: idUser
    }

    updateUser(usuario, (error, results, userAtualizado) => {

        if (error) return res.status(400).json({ message: 'Erro ao consultar o banco de dados', error: error });
        else if (results.affectedRows > 0) {

            console.log('Dados do usuário pelo route.js: ', userAtualizado);
            // WppTwilio.enviarMensagem(`
            //     Usuário atualizado com sucesso!\n\n
            //     Nome: ${userAtualizado.nome}
            //     Email: ${userAtualizado.email}   
            //     Nome de usuário: ${userAtualizado.nomeUser}
            //     Celular: ${userAtualizado.celular}
            // `)
            res.status(200).json({ message: 'Atualização realizada!', data: userAtualizado });
        }
        else {
            console.log(results);
            res.status(400).json({ message: 'Nenhum linha afetada' });
        }
    })
})

routerUser.delete('/principal/conta/deletarConsulta/:idHorario', (req, res) => {
    console.log('Dados para delete: ', req.params.idHorario);
    var idHorario = req.params.idHorario;
    
    deleteHorario(idHorario, (error, results) => {
        if (error) res.status(500).json({ message: 'Erro na consulta!', error });
        res.status(200).json({ message: 'Id da consulta deletada: ', results })
    })
})
// -------------------- FIM DA CONFIGURAÇÃO DE ROTAS DO USUÁRIO!

export {
    routerUser
}