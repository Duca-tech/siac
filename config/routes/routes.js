const express = require('express');
const db = require('../../helper/sql');
const router = express.Router();
const token = require('../token/token')
const WppTwilio = require('../twilio/twilio')
const session = require('express-session');

router.get('/', (req, res)=>{
    res.render('psicologo/agenda');
})

router.get('/user/cadastro', (req, res)=>{
    res.render('usuario/cadastro');
})

router.post('/user/cadastro', async(req, res)=>{
    console.log('Dados Recebidos: ', req.body);
    const {nome, email, nomeUser, password} = req.body;
    const user ={
        nome: nome,
        email: email,
        nomeUser: nomeUser,
        password: password
    }
    
     db.addUser(user, (error, results, usuario)=>{
        if(error){
            console.log('Erro ao adicionar cliente ', error.message);
            res.status(500).send('Erro ao Adicionar Cliente');
        }
        else if(results.affectedRows>0){
            console.log('Usuario adicionado com sucesso', usuario);
            WppTwilio.enviarMensagem(`
            Prezado Cliente, seu usuário foi cadastrado com sucesso no sistema\n\n
            nome: ${usuario.nome} \n
            E-mail: ${usuario.email}\n
            Nome de Usuário: ${usuario.nomeUser}
            `).then(()=>{
                console.log('Mensagem de Wpp enviada com sucesso!')
            }).catch((error)=>{
                console.error('Erro ao enviar mensagem para o cliente')
            })
            res.status(201).render('login'); // método send não aceita múltiplos argumentos
        }
    });
    
});
router.get('/user/login', (req,res)=>{
    res.render('usuario/login')
})

router.post('/user/login', async (req, res)=>{
    console.log('Dados Recebidos:', req.body);
    const {emailUsuario, password} = req.body;
    const user = {
        emailUsuario: emailUsuario,
        password: password
    }
    db.loginUser(user, async(error, results) =>{
        if(error){
            console.log('Erro de solicitação select', error.message);
            res.status(500).send('Erro de solicitação no bd');
        }
        else if(results.length>0){
            console.log('Usuário encontrado!');
            let tokenGerado = await token.gerarToken(results[0].idUser);
            console.log('token Gerado:', tokenGerado);
            
            req.session.id = results[0].idUser //pegando o id do banco e armazenando na requisição id do session
            //armazenando o token na requisiçao token do session
            req.session.token = tokenGerado;
            console.log('Id da sessão: ',req.session.id);
            const idUser = results[0].idUser;

            res.status(200).json({message:'autenticação realizada e token enviado para o user',auth: true,  token: tokenGerado, idUser: idUser});

            
        } 
        else{
            console.log('usuário não encontrado!');
            res.status(400).send('Usuário não encontrado');
        }
    });
})

//abrir pagina principal
router.get('/user/principal', (req,res)=>{
    res.render('usuario/principal');
})

//verificar token
router.post('/user/principal/verificarToken', token.verficarToken, (req, res)=>{
    res.send('Token verificado com sucesso');
})

//abrir pagina de Agendamento
router.get('/user/agendamento',  (req,res)=>{
    res.render('usuario/agendamento');
})

// Pegar dados do psico e agenda, e exibir na tela de agendamento
router.get('/user/agendamento/dadosPsico', (req,res)=>{
    
    db.getPsico((error, results)=>{
        if(error) return res.status(400).json({message: 'Falha ao buscar psicologos'});
        else if(results.psicologos.length>0){
            if(results.agenda.length>0){
                return res.status(200).json({message: 'Psicologos e agendas obtidos com sucesso!', psicologos: results.psicologos, agenda: results.agenda });
            }
            else return res.status(400).json({message: 'Há psicologos mas sem agenda!'})
        }
        else return res.status(400).json({message: 'Sem psicologos'});

    })
    

})
router.post('/user/inserirHorario', (req,res)=>{
    console.log('dados recebidos: ', req.body)
    var {idUser, hora} = req.body;
    idUser = parseInt(idUser);
    var horario = {
        idUser: idUser,
        hora: hora
    }
    console.log('Horario: ', horario);

    db.setHorario(horario, (error,results)=>{
        if(error) return res.status(400).json({message: 'erro na inserção de dados'})
        else if(results.affectedRows>0){
            return res.status(200).json({message: 'Usuário inserido com sucesso', data: results});
        }
        else{
            return res.status(400).json({message: 'Nenhuma linha afetada'});
        }
    });

})
router.post('/user/inserirHorario/wpp', (req,res)=>{

    console.log('dados recebidos: ', req.body)
    var {idUser, hora} = req.body;
    idUser = parseInt(idUser);
    var horario = {
        idUser: idUser,
        hora: hora
    }
    console.log('Horario: ', horario);
    db.setHorario(horario, (error,results, horarioInsert)=>{
        if(error) return res.status(400).json({message: 'erro na inserção de dados'})
        else if(results.affectedRows>0){
            console.log('Horario inseridos: ', horarioInsert)
            res.status(200).json({message: 'Usuário inserido com sucesso', data: results});
            WppTwilio.enviarMensagem(`
                Prezado Usuario SIAC, sua consulta foi agendada com sucesso \n\n 
                data: ${horarioInsert.data} \n
                hora: ${horarioInsert.hora}
            `).then(()=> console.log('Mensagem enviada com sucesso!')).catch((error)=>console.log('Falha ao enviar a mensagem para o cliente'))
        }
        else{
            return res.status(400).json({message: 'Nenhuma linha afetada'});
        }
    });
})


router.get('/user/principal/conta', (req,res)=>{
    res.render('contaUsuario');
})

router.post('/user/principal/conta/detalhes', (req,res)=>{
    console.log('dados recebidos: ', req.body);
    var idUser = parseInt(req.body.idUser)
    console.log('inteiro de idUser: ', idUser);

    db.getUser(idUser, (error, results)=>{
        if(error) return res.status(400).json({message: 'Erro Ao consultar Banco'});

        else if(results.length>0) return res.status(200).json({message: 'Usuário encontrado', data: results[0]});

        else{
            return res.status(400).json({message: 'Usuario não encontrado !'});
        }
    })
    
})
router.put('/user/principal/conta/update/:idUser', (req,res)=>{
    var idUser = req.params.idUser;
    console.log ('Id passado na URL: ', idUser);

    console.log('Dados recebidos ', req.body);
    var {nome, email, celular, nomeUser} = req.body;

    var usuario = {
        nome: nome,
        email: email,
        celular: celular,
        nomeUser: nomeUser,
        idUser: idUser
    }

    db.updateUser(usuario, (error, results, userAtualizado)=>{
        
        if(error) return res.status(400).json({message: 'Erro ao consultar no banco de dados', error: error});
        else if(results.affectedRows>0){

            console.log('dados do usuario pelo route.js: ', userAtualizado);
            WppTwilio.enviarMensagem(`
                Usuario Atualizado com Sucesso \n\n
                Nome: ${userAtualizado.nome}
                Email: ${userAtualizado.email}
                Nome de Usuário: ${userAtualizado.nomeUser}
                Celular: ${userAtualizado.celular}
            `)
            res.status(200).json({message: 'update realizado !', data: userAtualizado});
        }
        else{
            console.log(results);
            res.status(400).json({message: 'Nenhum linha afetada'});
        }
    })
})
router.post('/psicologo/gerarAgenda', (req,res)=>{
    const {horaIni, horaFin, diaSemana, data} = req.body;
    var agenda = {
        horaIni: horaIni,
        horaFin, horaFin,
        diaSemana, diaSemana,
        data: data
    }
    console.log('agenda: ', agenda);
    db.addAgenda(agenda, (error, results)=>{    
        if(error) return res.status(400).json({message: 'Erro na consulta: ', error: error});
        else if(results.agenda){
            console.log('Agenda inserida route.js: ', results.agenda);
            if(results.horas.length>0){
                console.log('Horarios adicionados route.js: ', results.horas);
                res.status(200).json({message: 'Agendas adicionada', agenda: results.agenda, message: 'Horarios Adicionados: ', horarios: results.horas});
            }
            else{
                res.status(400).json({message: 'Horarios não foram adicionados ou não estão no array'});
            }
        }
        else{
            res.status(401).json({message: 'Agenda não inserida'});
        }
    })

})



module.exports = {
    router,
    session
}
