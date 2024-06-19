import { callActionApi } from 'adminjs';
import { rejects } from 'assert';
import { error } from 'console';
import sql from 'mysql2';
import { resolve } from 'path';
export default sql

const connection = sql.createPool({
    host: '152.67.55.50',
    user: 'siac',
    port: '3306',
    password: 'SiacImes01!',
    database: 'siac',
    waitForConnections: true,
    connectionLimit: 10,

})

connection.getConnection((error) => {
    if (error) return console.log('Erro ao se conectar ao banco de dados.', error);
    console.log('Banco de dados conectado!');
})

// Encerrando a conexão do pool quando a aplicação for desligada:
process.on('exit', () => {
    connection.end(error => {
        if (error) {
            console.error('Erro ao encerrar a conexão do pool: ', error);
        }

        else {
            console.log('Conexão do pool encerrada com sucesso!');
        }
    })
})





// ------------------------------------- INÍCIO DE CONSULTAS NO BANCO PARA USUÁRIOS:

// Adiciona usuário:
const addUser = (user, userAdress, callback) => {

    // Verifica se usuário já está cadastrado:
    let userVerificationQuery = `SELECT nome, email, perfil FROM usuario WHERE email = ?`;
    let userVerificationValues = [user.email];

    connection.execute(userVerificationQuery, userVerificationValues, (error, results) => {
        if (error) {
            return console.log('Erro na consulta: ', error);
        }
        else {
            /* Sugestão de melhoria: 
                separar as funções de verificar usuário e adicionar usuário em duas funções diferentes:
                isso evita esse ninho de ifs e facilita a leitura do código segundo os princípios de código limpo
            */

            if (results.length > 0) {
                console.log('Usuario encontrado: ', results);
                var message = 'Usuário ja cadastrado no Sistema';
                callback(null, message, results);
            }
            else {
                // Variáveis para executar a query:
                let userInsertQuery = `INSERT INTO usuario(nome, email, nomeUser, perfil, password, data_nascimento) VALUES (?,?,?,?,?,?)`;
                let userInsertValues = [user.nome, user.email, user.nomeUser, user.perfil, user.password, user.data_nascimento];

                // Executa query e trás os resultados:
                connection.execute(userInsertQuery, userInsertValues, (error, results, fields) => {
                    /* Observação:
                        O método 'connection.query()' foi substituido pelo método connection.execute pois 
                        este oferece mais desempenho para as consultas no banco de dados.
                        Fonte: https://stackoverflow.com/questions/53197922/difference-between-query-and-execute-in-mysql
                    */

                    if (error) {
                        return console.error('Erro ao inserir usuário: ', error);
                    }
                    else {
                        console.log('Usuário inserido com sucesso: ', results);

                        // Obtém o ID do usuário inserido:
                        const userId = results.insertId;

                        // Chama a função para adicionar o endereço do usuário:
                        addUserAdress(userId, userAdress);
                    }
                });
            }
        }
    });
    connection.end();
};

// Adiciona endereço do usuário:
const addUserAdress = (userId, userAdress, callback) => {

    // Variáveis para executar a query:
    let adressInsertQuery = `INSERT INTO endereco(idUser, logradouro, bairro, cidade, estado, numero) VALUES(?,?,?,?,?,?)`;
    let adressInsertValues = [userId, userAdress.logradouro, userAdress.bairro, userAdress.cidade, userAdress.estado, userAdress.numero];

    // Executa query e trás os resultados:
    connection.execute(adressInsertQuery, adressInsertValues, (error, results, fields) => {
        if (error) {
            return console.log('Erro ao inserir endereço: ', error.message);
        }
        else {
            console.log('Usuário inserido com sucesso!');
            message = 'Usuário inserido com sucesso!';
            
            callback(null, message, user);
        }
    });
    connection.end();
}

// Esqueci Senha
const getEmail = (email, callback) => {
    var query = `SELECT * FROM usuario WHERE email = ?`
    connection.query(query, [email], (error, results) => {
        if (error) return console.log('Erro: ', error);
        console.log('Dados do usuário: ', results);
        callback(null, results);

    })
}
const updateSenha = (update, callback) => {
    var query = `UPDATE usuario set password = ? where idUser = ?`;
    connection.query(query, [update.senha, update.idUser], (error, results) => {
        if (error) return console.log('erro na consulta: ', error);
        console.log('resultado da consulta: ', results);
        var message = 'senha atualizada com sucesso!';
        callback(null, message, results);
    })
}


// Pegar usuário:
const loginUser = (user, callback) => {
    connection.query(`SELECT * FROM usuario WHERE email = ? AND password = ?`, [user.emailUsuario, user.password], (error, results) => {
        if (error) {
            return console.log('Erro ao selecionar usuário.');
        }
        else if (results.length > 0) {
            console.log('Usuário perfeitamente encontrado!', results[0]);
            var message = 'Usuário perfeitamente encontrado!'
            callback(null, results, message);
        }
        else {
            console.log('Usuário não encontrado!');
            var message = 'Usuário não encontrado!';
            callback(null, results, message);
        }
    })
}

// Pegar dados do psicólogo:
const getPsico = (callback) => {
    connection.query(`SELECT * FROM usuario where perfil = 'psicologo'`, (error, results1) => {
        if (error) {
            return console.log('Falha na consulta.', error);
        }
        else if (results1.length > 0) {

            connection.query(`SELECT * FROM agenda`, (error, results2) => {
                if (error) return console.log('Falha na consulta de horário');
                else if (results2.length > 0) {
                    // console.log('Agendas encontradas!', results2);
                    connection.query(`SELECT * FROM horario where disponibilidade = 0`, (error, results3) => {
                        if (error) {
                            return console.log('Erro na consulta.', error);
                        }
                        else if (results3.length > 0) {
                            // console.log('Horários da agenda encontrados!', results3);
                            callback(null, { psicologos: results1, agenda: results2, horarios: results3 });
                        }
                        else {
                            console.log('Nenhum horário encontrado!');
                        }
                    })
                }
                else {
                    console.log('Nenhuma agenda encontrada, somente psicólogo cadastrado.');
                    callback(null, { psicologos: results1, agenda: results2 });

                }
            })
        }
        else {
            console.log('Nenhum psicólogo encontrado, portanto sem agenda cadastradas.');
            var message = 'Nenhum psicólogo encontrado, portanto sem agenda cadastradas.';
            callback(null, { results: message });
        }
    })
}

const getHorario = (horario, callback) => {
    connection.query(`select * from horario where hora = ? and idUser =?`, [horario.hora, horario.idUser], (error, results) => {
        if (error) {
            return console.log('Erro na consulta.');
        }
        else if (results.length > 0) {
            return console.log('Usuário encontrado! Não foi possível adicionar usuário pois já existe agendamento!');
        }
        else {
            connection.query(`insert into horario(hora, idUser, disponibilidade) values(?, ?, 1)`, [horario.hora, horario.idUser], (error, results) => {
                if (error) return console.log('Falha na consulta!');

                else if (results.affectedRows > 0) {
                    console.log('Horários: ', horario);
                    callback(null, results, horario)
                }

                else {
                    console.log('Nenhuma linha afetada!');
                }
            })
        }
    })
}


const addHora = (horario, callback) => {
    const query = `update horario set disponibilidade = 1, status = 'agendado', idUser = ? where idHorario = ?`
    const query2 = `select * from horario where idHorario = ?`
    const params2 = [horario.idUser];
    connection.query(query2, params2, (error, results) => {
        if (error) return console.log('erro: ', error);
        if (results.length > 0) {
            var message = `ja existe uma consulta marcadada`
            callback(null, message, results);
        }
        else {
            connection.query(query, [horario.idUser, horario.idHorario], (error, results) => {
                if (error) return console.log('Erro na consulta: ', error)

                console.log('Resultado da Consulta: ', results);
                var message = `Agendamento realizado com Sucesso`;
                callback(null, message, results);
            })
        }
    })
    connection.query(query, [horario.idUser, horario.idHorario], (error, results) => {
        if (error) return console.log('Erro na consulta: ', error)

        console.log('Resultado da Consulta: ', results);
        callback(null, results);
    })
}

const updateHorario = (horario, callback) => {
    connection.query(`UPDATE horario set disponibilidade = 1, idUser = ? where hora = ?`, [horario.idUser, horario.hora], (error, results) => {
        if (error) return console.log('Erro na consulta ao banco de dados.');
        else if (results.affectedRows > 0) {
            console.log('Atualização realizada!');
            callback(null, results);
        }
        else {
            console.log('Nenhuma linha afetada!');
        }
    })
}

const getUser = (idUser, callback) => {
    connection.query(`SELECT horario.*, agenda.*, usuario.*
        FROM horario
        INNER JOIN agenda ON horario.idAgenda = agenda.idAgenda
        INNER JOIN usuario ON agenda.idUser = usuario.idUser
        WHERE horario.idUser = ?;
    `, [idUser], (error, results) => {
        if (error) return console.log('Erro na consulta.', error);
        else if (results.length > 0) {
            console.log('Usuário encontrado: ', results);
            callback(null, results);
        }
        else {
            console.log('select pra horario, agenda e usuario não foi!');
            connection.query(`SELECT nome, email ,celular, nomeUser FROM usuario where idUser = ?`, [idUser], (error, results) => {
                if (error) console.log('Erro de consulta.');
                console.log('Usuário encontrado, porém não existe agenda: ', results);
                callback(null, results);
            })

        }
    })
}

const updateUser = (usuario, callback) => {
    console.log('id User:', usuario.idUser)
    connection.query(`UPDATE usuario SET nome = ?, email = ?, celular = ?, nomeUser = ? where idUser = ?`, [usuario.nome, usuario.email, usuario.celular, usuario.nomeUser, usuario.idUser], (error, results) => {
        if (error) return console.log('Erro na consulta. Status:', error);
        else if (results.affectedRows > 0) {
            console.log('Atualização feita sql.js!', usuario);
            callback(null, results, usuario);
        }
        else {
            console.log('Nenhuma linha atualizada.', results[0]);
            // Se retornar essa condição é pq não foi encontrado nenhuma linha relacionado ao WHERE.
        }
    })
}

const deleteHorario = (idHorario, callback) => {
    connection.query(`UPDATE horario SET disponibilidade = 0, idUser = null WHERE idHorario = ?`, [idHorario], (error, results) => {
        if (error) return console.log('Erro na consulta.');
        else if (results.affectedRows > 0) callback(null, idHorario);
        else console.log('Nenhuma linha deletada!', results);
    })
}

const getAgenda = (idUser, callback) => {
    connection.query(`SELECT * FROM horario WHERE idUser = ?`, [idUser], (error, results) => {
        if (error) return console.log('Erro de consulta.');
        callback(null, results);
    })
}

const getHours = (dados, callback) => {
    var query = `SELECT horario.*, agenda.*, usuario.*
    FROM horario 
    INNER JOIN agenda ON horario.idAgenda = agenda.idAgenda 
    INNER JOIN usuario ON agenda.idUser = usuario.idUser 
    WHERE 1=1 `
    var parametros = []
    if (dados.diaSemana) {
        query += `AND agenda.diaSemana = ?`
        parametros.push(dados.diaSemana)
    }
    if (dados.data) {
        query += `AND agenda.data = ?`
        parametros.push(dados.data)
    }

    if (dados.idUser) {
        query += `AND usuario.idUser = ?`
        parametros.push(dados.idUser)
    }

    if (dados.hora) {
        query += `AND horario.hora = ?`
        parametros.push(dados.hora);
    }
    connection.query(query, parametros, (error, results) => {
        if (error) return console.log('Erro na Consulta do Banco!')
        console.log('Resultado da Conulta: ', results);
        callback(null, results)
    })
}
// -------------------- FIM DE CONSULTAS NO BANCO PARA USUÁRIOS!


// -------------------- INÍCIO DE CONSULTAS NO BANCO PARA PSICÓLOGOS:
// Adicionar agenda:
const addAgenda = (agenda, callback) => {
    console.log('Agenda no sql: ', agenda)
    connection.query(`INSERT INTO agenda (horaIni, horaFin, data, diaSemana, idUser) VALUES (?, ?, ?, ?, ?)`, [agenda.horaIni, agenda.horaFin, agenda.data, agenda.diaSemana, agenda.idPsico], (error, results) => {
        if (error) return console.log('Erro na consulta.');
        else if (results.affectedRows > 0) {
            console.log('Agenda adicionada com sucesso: ', results.insertId);
            var idAgenda = results.insertId
            var horaIni = agenda.horaIni;
            console.log('Hora Inicial: ', horaIni);

            var horaFin = agenda.horaFin;
            console.log('Hora Final: ', horaFin);
            var horaAtual = horaIni;
            var horas = []

            function inserirHorario() {
                console.log(horaFin)
                if (horaAtual > horaFin) {
                    // Se já passou da hora final, finaliza a inserção.
                    console.log('Inserção de horários finalizada.');
                    console.log('Lista de horas:', horas);
                    return callback(null, { agenda: agenda, horas: horas });
                }

                connection.query(`INSERT INTO horario (hora, idAgenda, idPsico) VALUES (?, ?, ?)`, [horaAtual, idAgenda, agenda.idPsico], (error, results2) => {
                    if (error) {
                        console.log('Erro ao adicionar horário: ', error);
                    } else if (results2.affectedRows > 0) {
                        console.log('Horário adicionado com sucesso: ', horaAtual);
                        horas.push(horaAtual);
                    } else {
                        console.log('Nenhuma linha afetada ao adicionar horário: ', horaAtual);
                    }

                    var [hora, minuto] = horaAtual.split(':');
                    minuto = parseInt(minuto) + 30;
                    hora = parseInt(hora);

                    if (minuto >= 60) {
                        minuto = minuto - 60;
                        hora += 1;

                    }
                    horaAtual = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;

                    inserirHorario(); // Chama a função recursivamente.
                });
            }
            inserirHorario();
        }
        else {
            console.log('nenhuma linha foi afetada');
        }
    })

}

const deleteAgenda = (idAgenda, callback) => {
    connection.query(`DELETE  horario, agenda FROM horario INNER JOIN agenda ON horario.idAgenda = agenda.idAgenda WHERE horario.idAgenda = ? `, [idAgenda], (error, results) => {
        if (error) return console.log('Erro na consulta: ', error);
        else if (results.affectedRows > 0) {
            console.log('Agenda deletada com Sucesso: ', results);
            callback(null, results)
        }
        else {
            connection.query(`DELETE agenda from agenda where idAgenda = ?`, [idAgenda], (error, results) => {
                if (error) return console.log('Erro na consulta: ', error)
                callback(null, results);
            })
            console.log('Nenhuma Agenda Encontrado com esse Id');
        }
    })
}

const getPsicoAgenda = (idPsico, perfil, callback) => {
    if (perfil == 'administrador') {
        connection.query(`SELECT agenda.*, usuario.* from agenda inner join usuario on agenda.idUser = usuario.idUser`, (error, results) => {
            if (error) return console.log('Erro na Consulta');
            console.log('Agendas: ', results);
            callback(null, results);
        })
    }
    else {
        connection.query(`SELECT * FROM agenda WHERE idUser = ?`, [idPsico], (error, results) => {
            if (error) return console.log('Erro na Consulta');
            console.log('Agendas: ', results);
            callback(null, results);
        })
    }
}

const relatorioPac = (idPsico, callback) => {
    const query = `select DISTINCT usuario.nome, usuario.idUser from usuario left join
    horario on usuario.idUser = horario.idUser
   where horario.idPsico = ?`
    connection.query(query, [idPsico], (error, results) => {
        if (error) return console.log('Erro na consulta: ', error);
        console.log('results: ', results)
        callback(null, results);
    })
}

const getHoursPac = (idPaciente, callback) => {
    const query = `
SELECT DISTINCT 
    horario.idHorario, 
    horario.hora,
    horario.status,
    agenda.idAgenda,
    agenda.data, 
    usuario.*,
    prontuario.doencaPreExistente,
    prontuario.cirurgiaAnterior,
    prontuario.medicamentoEmUso,
    prontuario.alergia,
    prontuario.observacaoProfissional,
    prontuario.recomendacaoProfissional,
    prontuario.planoTratamento,
    prontuario.data_consulta
FROM 
    horario
INNER JOIN 
    usuario ON horario.idUser = usuario.idUser
INNER JOIN 
    agenda ON horario.idAgenda = agenda.idAgenda
LEFT JOIN 
    prontuario ON horario.idHorario = prontuario.idHorario
WHERE 
    horario.idUser = ?`
    connection.query(query, [idPaciente], (error, results) => {
        if (error) return console.log('erro na consulta: ', error);
        console.log('results: ', results);
        callback(null, results);
    })
}
const inserirPront = async (data, callback) => {
    const query = `
        INSERT INTO prontuario
        (idUser, idPsico, idHorario, data_consulta, doencaPreExistente, cirurgiaAnterior, medicamentoEmUso, alergia, historicoFamiliar, observacaoProfissional, recomendacaoProfissional, planoTratamento)
        VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    var params = [data.idPac, data.idPsico, data.idHorario, data.dataConsulta, data.doencas, data.cirurgias, data.medicamentos, data.alergias, data.historicoFamiliar, data.observacoes, data.recomendacoes, data.planosTratamento]

    const query2 = `update horario set status = 'presente' where idHorario = ?`
    var params2 = [data.idHorario]

    const results = await new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) return reject(error);
            console.log('Prontuario inserido com Sucesso');
            var message = 'Prontuario inserido com Sucesso';
            resolve(results);
        });
    });
    const results2 = await new Promise((resolve, reject) => {
        connection.query(query2, params2, (error, results) => {
            if (error) return reject(error);
            console.log('Horario Atualizado com Sucesso!');
            var message2 = 'Horario Atualizado com Sucesso!'
            resolve(results);
        });
    });

    callback(null, results, results2);
}


// -------------------- FIM DE CONSULTAS NO BANCO PARA PSICÓLOGOS!

//---------------------CONSULTA DE VERIFICAÇÃO DE PERFIL!
const verificarPerfil = (idUser, callback) => {
    var query = `SELECT PERFIL FROM USUARIO WHERE idUser = ?`

    connection.query(query, [idUser], (error, results) => {
        if (error) return console.log('Erro: ', error)
        console.log('Resultado da consulta', results[0]);
        callback(null, results[0]);
    })
}

//-------------------- INÍCIO DE CONSULTAS NO BANCO PARA RECEPCIONISTAS:


// -------------------- FIM DE CONSULTAS NO BANCO PARA RECEPCIONISTAS!


// -------------------- INÍCIO DE CONSULTAS NO BANCO PARA CONSULTAS MÉDICAS:
const verificarConsulta = (credencial, callback) => {
    connection.query(`SELECT usuario.nome AS NomePaciente, usuario.idUser AS idUser, horario.hora, agenda.data, agenda.diaSemana, profissionalpsicologo.nome AS NomePsico, horario.status, horario.idHorario FROM horario INNER JOIN usuario ON horario.idUser = usuario.idUser INNER JOIN agenda ON horario.idAgenda = agenda.idAgenda INNER JOIN profissionalpsicologo ON agenda.idPsico = profissionalpsicologo.idPsico WHERE usuario.nomeUser = ?`, [credencial], (error, results) => {
        if (error) return console.log('Erro na consulta: ', error);
        else if (results.length > 0) {
            console.log('Usuário encontrado!', results);
            callback(null, results);
        }
        else {
            console.log('Usuário não encontrado!');
            callback(null, results);
        }
    })
}

const putStatusConsult = (horario, callback) => {
    connection.query(`UPDATE horario SET status = 'presente' WHERE idHorario = ?`, [horario.idHorario], (error, results1) => {
        if (error) return console.log('Erro na consulta: ', error);

        connection.query(`SELECT usuario.nome AS NomePaciente, horario.hora, horario.status AS status,agenda.data, agenda.diaSemana, profissionalpsicologo.nome AS NomePsico, horario.status, horario.idHorario FROM horario INNER JOIN usuario ON horario.idUser = usuario.idUser INNER JOIN agenda ON horario.idAgenda = agenda.idAgenda INNER JOIN profissionalpsicologo ON agenda.idPsico = profissionalpsicologo.idPsico WHERE usuario.idUser = ?`, [horario.idUser], (error, results2) => {
            if (error) return console.log('Erro na consulta: ', error);
            callback(null, results1, results2);
        })
    })
}

//------------- Consultas para perfil ADM ------------------------------
const getDataAdm = async (callback) => {
    try {
        const query = `
            SELECT horario.*, agenda.*, usuario.*
            FROM horario
            INNER JOIN agenda ON horario.idAgenda = agenda.idAgenda
            INNER JOIN usuario ON agenda.idUser = usuario.idUser`;

        const query2 = 'SELECT * FROM usuario';

        const query3 = 'SELECT agenda.*, usuario.* from agenda inner join usuario on agenda.idUser = usuario.idUser';

        const results = await new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        const results2 = await new Promise((resolve, reject) => {
            connection.query(query2, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        const results3 = await new Promise((resolve, reject) => {
            connection.query(query3, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            })
        })

        callback(null, results, results2, results3);
    } catch (error) {
        console.log('Erro na consulta ao banco: ', error);
        callback(error, null, null);
    }
};

// -------------------- FIM DE CONSULTAS NO BANCO PARA CONSULTAS MÉDICAS!

export {
    addUser,
    loginUser,
    getPsico,
    getHorario,
    addHora,
    updateHorario,
    getUser,
    verificarPerfil,
    updateUser,
    deleteHorario,
    getAgenda,
    addAgenda,
    getHours,
    deleteAgenda,
    getPsicoAgenda,
    getEmail,
    updateSenha,
    verificarConsulta,
    getDataAdm,
    putStatusConsult,
    relatorioPac,
    inserirPront,
    getHoursPac
}