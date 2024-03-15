import express  from 'express';
import  {addUser,loginUser,getPsico,getHorario,updateHorario,getUser,updateUser,deleteHorario,getAgenda,addAgenda,deleteAgenda,getPsicoAgenda,getPsicoLogin,verificarConsulta,addPsico,putStatusConsult,addRecep,updateRecep} from '../helper/sql.js'
const routerRecep = express.Router();
import {gerarToken,verficarToken,tokenDestroyer} from '../config/token/token.js'
import {enviarMensagem} from '../config/twilio/twilio.js';
import session from 'express-session';


// -------------------- INÍCIO DA CONFIGURAÇÃO DE ROTAS PARA RECEPCIONISTA:
routerRecep.get('/recepcionista/cadastro', (req, res) => {
    res.render('recepcionista/cadastroRecepcionista');
})

// Rota para criar um novo recepcionista:
routerRecep.post('/recepcionista/cadastro', async (req, res) => {
    try {
        const { nome, email, nomeRecep, password, celular, cpf } = req.body;
        const recep = {
            nome: nome,
            email: email,
            nomeRecep: nomeRecep,
            password: password,
            celular: celular,
            cpf: cpf
        };
        
        // Lógica para inserir os dados do recepcionista no banco de dados:
        addRecep(recep, (error, results, recepcionista) => {
            if (error) {
                console.log('Erro ao adicionar recepcionista.', error.message);
                res.status(500).send('Erro ao adicionar recepcionista.');
            }
            else if (results.affectedRows > 0) {
                console.log('Recepcionista adicionado com sucesso!', usuario);
                WppTwilio.enviarMensagem(`
                Prezado(a) recepcionista, seu usuário foi cadastrado com sucesso no sistema!\n\n
                Nome: ${recepcionista.nome} \n
                E-mail: ${recepcionista.email}\n
                Nome de usuário: ${recepcionista.nomeUser}
                `).then(() => {
                    console.log('Mensagem de wpp enviada com sucesso!')
                }).catch((error) => {
                    console.error('Erro ao enviar mensagem para o cliente.')
                })
                res.status(201).render('login'); // Método send não aceita múltiplos argumentos.
            }
        });
        res.status(201).json({ message: 'Recepcionista cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar recepcionista: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// // Rota para obter todos os recepcionistas:
// router.get('/', async (req, res) => {
//     try {
//         // Lógica para buscar todos os recepcionistas no banco de dados
//         const recepcionistas = await db.query('SELECT * FROM recepcionistas');
//         res.json(recepcionistas);
//     } catch (error) {
//         console.error('Erro ao buscar recepcionistas:', error);
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }
// });

// // Rota para obter um recepcionista específico pelo ID:
// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         // Lógica para buscar um recepcionista pelo ID no banco de dados
//         const recepcionista = await db.query('SELECT * FROM recepcionistas WHERE id = ?', [id]);
//         if (recepcionista.length > 0) {
//             res.json(recepcionista[0]);
//         } else {
//             res.status(404).json({ error: 'Recepcionista não encontrado' });
//         }
//     } catch (error) {
//         console.error('Erro ao buscar recepcionista:', error);
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }
// });

// // Rota para atualizar os dados de um recepcionista pelo ID:
// router.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { nome, email, nomeRecep, password, celular, cpf } = req.body;
//         // Lógica para atualizar os dados do recepcionista no banco de dados
//         await db.query('UPDATE recepcionistas SET nome = ?, email = ?, nomeRecep = ?, password = ?, celular = ?, cpf = ? WHERE id = ?', [nome, email, nomeRecep, password, celular, cpf, id]);
//         res.json({ message: 'Dados do recepcionista atualizados com sucesso' });
//     } catch (error) {
//         console.error('Erro ao atualizar recepcionista:', error);
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }
// });

// // Rota para excluir um recepcionista pelo ID:
// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         // Lógica para excluir o recepcionista do banco de dados
//         await db.query('DELETE FROM recepcionistas WHERE id = ?', [id]);
//         res.json({ message: 'Recepcionista excluído com sucesso' });
//     } catch (error) {
//         console.error('Erro ao excluir recepcionista:', error);
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }
// });

routerRecep.get('/recepcionista/principal/verificarConsulta', (req, res) => {
    res.render('recepcionista/verificacaoAgendamento')
})

routerRecep.post('/recepcionista/principal/verificarConsulta', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    var credencial = req.body.inputCred;
    console.log('Credencial: ', credencial);
    verificarConsulta(credencial, (error, results) => {
        res.status(200).json({ message: 'Enviando dados para o cliente: ', consulta: results });
    })
})

routerRecep.post('/recepcionista/principal/verificarConsulta/confirmarPresenca', (req, res) => {
    console.log('Dados recebidos: ', req.body);
    var { idHorario, idUser } = req.body;
    idHorario = parseInt(idHorario);
    idUser = parseInt(idUser);
    var horario = {
        idHorario: idHorario,
        idUser: idUser
    }

    putStatusConsult(horario, (error, results1, results2) => {
        res.status(200).json({ message: 'Resposta do servidor: ', error: error, results: results1, dados: results2 });
    })
})

export {
    routerRecep
}