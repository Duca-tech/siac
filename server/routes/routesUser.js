import { 
    addUser, loginUser, getPsico, getHorario, addHora, updateHorario, getUser, updateUser, deleteHorario, getAgenda, getHours, addAgenda, deleteAgenda, getPsicoAgenda, verificarConsulta, putStatusConsult 
} from '../helper/sql.js'

import { 
    gerarToken, verificarToken, tokenDestroyer 
} from '../config/token/token.js'

import { 
    verificacaoUser 
} from '../config/verificacaoPerfil/verificacaoUser.js'

import express from 'express';
const routerUser = express.Router();


// -------------------- INÍCIO DA CONFIGURAÇÃO DE ROTAS DO USUÁRIO:
routerUser.get('/cadastro', (req, res) => {
    res.render('usuario/cadastro');
})

routerUser.get('/buscarEndereco', async (req, res) => {
    var { cep } = req.query;
    console.log('Cep Server: ', cep);
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`); //fetch para buscar endereço
    const data = await response.json();
    console.log('Data: ', data);
    res.json(data);
})

routerUser.post('/cadastro', async (req, res) => {
    console.log('Dados Recebidos: ', req.body);

    const { nome, email, nomeUser, perfil, cep, logradouro, bairro, localidade, uf, numero, senha, dataNascimento } = req.body;

    const user = {
        nome: nome,
        email: email,
        nomeUser: nomeUser,
        perfil: perfil,
        password: senha,
        dataNascimento: dataNascimento
    }

    const end = {
        logradouro: logradouro,
        bairro: bairro,
        localidade: localidade,
        uf: uf,
        numero: numero,
        senha: senha,
        cep: cep
    }

    addUser(user, end, (error, message, results) => {
        if (error) {
            console.log('Erro ao adicionar cliente ', error.message);
            res.status(500).send('Erro ao Adicionar Cliente');
        }
        res.status(201).json({ message: message, results: results });
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

    loginUser(user, async (error, results, message) => {
        if (error) {
            console.log('Erro de solicitação select.', error.message);
            res.status(500).send('Erro de solicitação no banco de dados.');
        }
        if (results.length > 0) {
            console.log('Usuário encontrado!', results);
            let tokenGerado = await gerarToken(results[0].idUser);
            console.log('Token gerado:', tokenGerado);

            // Pegando o id do banco e armazenando na requisição id do session.
            req.session.userId = results[0].idUser;
            req.session.perfil = results[0].perfil;

            // Armazenando o token na requisiçao token do session.
            req.session.token = tokenGerado;
            console.log('Id da sessão: ', req.session.id);


            return res.status(200).json({ message: 'Autenticação realizada e token enviado para o user', auth: true, token: tokenGerado, results: results });
        }
        else {
            console.log(message);
            return res.status(200).json({ message: message, results: results });
        }
    });
})

// Abrir página principal:
routerUser.get('/principal', verificarToken, (req, res) => {
    res.render('usuario/principal');
})

routerUser.post('/principal/ConsultasMarcadas', (req, res) => {
    console.log('id rota: ', req.body.idUser);
    getAgenda(req.body.idUser, (error, results) => {
        res.status(200).json({ message: 'Consultas marcadas', results: results })
    })
})

routerUser.get('/principal/verificarToken', verificarToken, (req, res) => {
    res.status(200).json({ message: 'token verificado com Sucesso' });
})

// Verificar token:
routerUser.post('/principal/verificarToken', verificarToken, (req, res) => {
    console.log('dados recebidos: ', req.body);
    var { idUser } = req.body
    idUser = parseInt(idUser);
    console.log('int: ', idUser);

    getAgenda(idUser, (error, results) => {
        if (error) return res.status(500).json({ message: 'Falha na consulta!' })
        res.status(200).json({ message: 'Enviando dados sobre a consulta: ', data: results });
    })
})

// Abrir painel de dashboards:
routerUser.get('/dash', (req, res) => {
    res.render('usuario/admin/dashboard');
})

// Abrir página de histórico de consultas:
routerUser.get('/consultas/historico', (req, res) => {
    res.render('usuario/paciente/historicoConsultas');
    // Diretório até o arquivo .ejs contendo o HTML da página que será carregada 
});

// Abrir página de agendamento
routerUser.get('/agendamento', verificarToken, verificacaoUser, (req, res) => {
    res.render('usuario/paciente/agendamento');
})

routerUser.get('/agendamento/remarcacao', verificarToken, verificacaoUser, (req, res) => {
    var idHorario = req.query.idHorario;
    console.log('idHorario routerUser: ', idHorario);

    res.render('usuario/paciente/agendamento', { horarioExcluir: idHorario });
})

routerUser.get('/agendamento/cancelarConsulta', verificarToken, verificacaoUser, (req, res) => {
    var idHorario = req.query.idHorario;
    console.log('IdHorario router user: ', idHorario);
    deleteHorario(idHorario, (error, results) => {
        res.status(200).json({ message: 'Agendamento Cancelado com Sucesso', results: results });
    })
})

// Pegar dados do psicólogo e agenda, e exibir na tela de agendamento:
routerUser.get('/agendamento/dadosPsico', (req, res) => {

    getPsico((error, results) => {
        if (error) return res.status(400).json({ message: 'Falha ao buscar Consultas' });

        console.log('results: ', results)
        console.log('psicos: ', results.psicologos);
        console.log('agenda: ', results.agenda);
        console.log('horarios: ', results.horarios);
        if (results.psicologos.length === 0) {
            res.status(200).json({ message: 'Sem psicólogos cadastrados' });
        }
        if (results.agenda.length === 0) {
            res.status(200).json({ message: 'Sem agenda de psicólogos' });
        }

        // console.log('Resultado da Consulta: ', results);
        res.status(200).json({ message: 'Resultado da busca de Agenda, Psicos e Horarios: ', psicologos: results.psicologos, agenda: results.agenda, horarios: results.horarios });


    })
})


routerUser.post('/principal/agendamento/buscar', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    var dados = req.body;
    getHours(dados, (error, results) => {
        res.status(200).json({ message: 'Resultados da consulta com banco: ', dados: results });
    })
})

routerUser.post('/agendamento/agendarConsulta', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    if (typeof req.body.horarioExcluir !== undefined) {
        var horario = {
            hora: req.body.hora,
            idHorario: req.body.idHorario,
            idUser: req.body.idUser,
            horarioExcluir: req.body.horarioExcluir
        }
    }
    else {
        var horario = {
            hora: req.body.hora,
            idHorario: req.body.idHorario,
            idUser: req.body.idUser
        }
    }

    addHora(horario, (error, message1, message2, results) => {
        res.status(200).json({ message1: message1, message2: message2, results: results });
    })
})

routerUser.post('/inserirHorario', (req, res) => {
    console.log('Dados recebidos: ', req.body)
    var { idUser, hora } = req.body;

    idUser = parseInt(idUser);
    var horario = {
        idUser: idUser,
        hora: hora
    }
    console.log('Horário: ', horario);

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

routerUser.get('/principal/conta', verificarToken, (req, res) => {
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