const sql = require('mysql2');

const conexao =  sql.createPool({
        host: 'roundhouse.proxy.rlwy.net',
        user: 'root',
        password: 'hFcF2a4f4-dBF5g162e2hhfFF3efHB16',
        database: 'railway',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000, // Aumentar o tempo limite para 10 segundos (valor em milissegundos)
        
    })

// Verificar se houve erro ao criar o pool de conexão
conexao.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Banco de dados conectado!');
        connection.release(); // Liberar a conexão de teste
    }
});

// Encerrando a conexão do pool quando a aplicação for desligada
process.on('exit', () => {
    conexao.end(err => {
        if (err) {
            console.error('Erro ao encerrar a conexão do pool:', err);
        } else {
            console.log('Conexão do pool encerrada com sucesso');
        }
    });
});
        
    

/*Inicio de consultas no Banco para Usuario */

//função para adicionar usuario
const addUser =(user, callback) =>{
         conexao.query(`insert into usuario(nome, email, nomeUser, password) values (?,?,?,?)`, [user.nome, user.email, user.nomeUser, user.password], (error, results, fields)=>{
        if(error) return console.log('Erro ao executar a consulta: ', error.message);
        console.log('Dados Inseridos', user)
        console.log('dados das colunas: ', results);
        callback(null, results, user);
    })
}
//pegar usuario
const loginUser = (user, callback)=>{
    conexao.query(`select * from usuario where (email = ? or nomeUser = ?) and password = ?`, [user.emailUsuario, user.emailUsuario, user.password], (error, results)=>{
        if(error) return console.log('erro ao selecionar usuário');
        else if(results.length>0){
            console.log('usuario perfeitamente encontrado!', results[0]);
            callback(null, results);
        }
        else return console.log('usuário não encontrado!');
        
    })
}

//Pegar dados do psicologo
const getPsico = (callback)=>{
    conexao.query(`SELECT * FROM profissionalpsicologo`, (error, results1)=>{
        if(error) return console.log('Falha na consulta');
        else if(results1.length>0){
            console.log('psicologos encontrados!', results1);
            conexao.query(`SELECT * FROM agenda`, (error, results2)=>{
                if(error) return console.log('Falha na consulta de horário');
                else if(results2.length>0){
                    console.log('Agendas Encontradas!', results2);
                    
                    conexao.query(`SELECT * FROM horario`, (error, results3)=>{
                        if(error) return console.log('Falha na consulta');
                        else if(results3.length>0){
                            console.log('Horarios da agenda encontrados!', results3);
                            callback(null, {psicologos: results1, agenda: results2, horarios: results3});
                        }
                        else{
                            console.log('Nenhum horario encontrado!');
                        }
                    })
                    
                }
                else{
                    console.log('Sem nenhum agenda !, só tem psicólogos');
                    callback(null, {psicologos:results1, agenda: results2});
                    
                }
                
            })
        }
        else{
            console.log('Sem nenhum Psicologo, portanto sem agenda');
            callback(null, null);
        }
    })
}

const getHorario = (horario, callback)=>{

    conexao.query(`select * from horario where hora = ? and idUser =?`, [horario.hora, horario.idUser], (error, results)=>{
        if(error) return console.log('erro na consulta')
        else if(results.length>0) return console.log('Usuario encontrado! não pode adicionar usuário pois ja existe agendamento!')
        else{
            conexao.query(`insert into horario(hora, idUser, disponibilidade) values(?, ?, 1)`, [horario.hora, horario.idUser], (error, results)=>{
                if(error) return console.log('falha na consulta!');
                else if(results.affectedRows>0){
                    console.log('Horarios: ', horario);
                    callback(null, results, horario)
                }
                else{
                    console.log('Nenhuma Linha afetada!');
                }
            })
    }})
    
    
}
const updateHorario = (horario, callback)=>{
    conexao.query(`UPDATE horario set disponibilidade = 1, idUser = ? where hora = ?`, [horario.idUser, horario.hora], (error, results)=>{
        if(error) return console.log('Erro na consulta do Banco');
        else if(results.affectedRows>0){
            console.log('Update realizado!');
            callback(null, results);
        }
        else{
            console.log('Nenhuma linha afetada!');
        }
    })
}

const getUser = (idUser, callback)=>{
    conexao.query(`SELECT horario.*, agenda.*, profissionalpsicologo.*, usuario.* FROM horario INNER JOIN agenda ON horario.idAgenda = agenda.idAgenda INNER JOIN profissionalpsicologo ON agenda.idPsico = profissionalpsicologo.idPsico INNER JOIN usuario ON horario.idUser = usuario.idUser WHERE horario.idUser = ?;`, [idUser], (error, results)=>{
        if(error) return console.log('Erro na consulta');
        else if(results.length>0){
            console.log('usuario encontrado: ', results);
            callback(null, results);
        }
        else{
            console.log('select pra horario, agenda e usuario não foi!');
            conexao.query(`SELECT * FROM usuario where idUser = ?`, [idUser], (error, results)=>{
                if(error) console.log('Erro de Consulta');
                console.log('Usuario encontrado, porem não ha agenda: ', results);
                callback(null, results);
            })
            
        }
    })
}

const updateUser = (usuario, callback) =>{
    console.log('id User:' , usuario.idUser)
    conexao.query(`UPDATE usuario SET nome = ?, email = ?, celular = ?, nomeUser = ? where idUser = ?`, [usuario.nome, usuario.email, usuario.celular, usuario.nomeUser, usuario.idUser], (error, results)=>{
        if(error) return console.log('Erro na consulta', error)
        else if(results.affectedRows>0){
            console.log('Update feito sql.js !', usuario);
            callback(null, results, usuario);
        }
        else{
            console.log('Nenhuma linha atualizada', results[0]); // se retorna essa condição é pq não ta encontrando nenhuma linha relacionado ao where
        }
    })
}

const deleteHorario = (idHorario, callback)=>{
    conexao.query(`update horario set disponibilidade = 0, idUser = null where idHorario = ?`, [idHorario], (error, results)=>{
        if(error) return console.log('Erro na Consulta');
        else if(results.affectedRows>0) callback(null, idHorario);
        else console.log('Nenhuma linha deletada!', results);
    })
}

const getAgenda = (idUser, callback)=>{
    conexao.query(`select * from horario where idUser = ?`, [idUser], (error, results)=>{
        if(error) return console.log('erro de consulta');
        callback(null, results);
    })
}
/*Fim de consultas no Banco para Usuario */

/*Inicio de consultas no Banco para Psicologos */


//adicionar agenda
const addAgenda = (agenda, callback)=>{
    console.log('Agenda no sql: ', agenda)
     conexao.query(`insert into agenda(horaIni, horaFin, data, diaSemana,idPsico) values(?, ?, ?, ?, ?)`, [agenda.horaIni, agenda.horaFin, agenda.data, agenda.diaSemana, agenda.idPsico], (error, results)=>{
        if(error) return console.log('Erro na consulta');
        else if(results.affectedRows>0){
            console.log('Agendada adicionada com sucesso: ', results.insertId);
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
                    // Se já passou da hora final, finaliza a inserção
                    console.log('Inserção de horários finalizada');
                    console.log('Array de Horas:', horas);
                    return callback(null, { agenda: agenda, horas: horas });
                }

                conexao.query(`INSERT INTO horario(hora, idAgenda) VALUES (?, ?)`, [horaAtual, idAgenda], (error, results2) => {
                    if (error) {
                        console.log('Erro ao adicionar horário:', error);
                    } else if (results2.affectedRows > 0) {
                        console.log('Horário adicionado com sucesso:', horaAtual);
                        horas.push(horaAtual);
                    } else {
                        console.log('Nenhuma linha afetada ao adicionar horário:', horaAtual);
                    }

                    var [hora, minuto] = horaAtual.split(':');
                     minuto = parseInt(minuto) + 30;
                     hora = parseInt(hora);
                    if (minuto >= 60) {
                        minuto = minuto-60;
                        hora +=1;
                        
                    } 
                    horaAtual = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;


                    inserirHorario(); // Chama a função recursivamente
                });
            }

            inserirHorario();
            

            
        }
        else{
            console.log('nenhuma linha foi afetada');
        }
    })
    
}

const deleteAgenda = (idAgenda, callback)=>{
    conexao.query(`delete  horario, agenda from horario inner join agenda on horario.idAgenda = agenda.idAgenda where horario.idAgenda = ? `, [idAgenda], (error, results)=>{
        if(error) return console.log('Erro na consulta: ', error);
        else if(results.affectedRows>0){
            console.log('Agenda deletada com Sucesso: ', results);
            callback(null, results)
        }
        else{
            console.log('Nenhuma Agenda Encontrado com esse Id');
        }
    })
}

const getPsicoAgenda = (idPsico, callback)=>{
    conexao.query(`select * from agenda where idPsico = ?`, [idPsico], (error, results)=>{
        if(error) return console.log('Erro na Consulta');
        console.log('Agendas: ', results);
        callback(null, results);
    })
}

const getPsicoLogin = (psicoLogin, callback) =>{
    conexao.query(`SELECT * FROM profissionalpsicologo where email = ? and senha = ?`, [psicoLogin.email, psicoLogin.senha], (error, results)=>{
        if(error) return console.log('Erro na consulta');
        else if(results.length>0){
            console.log('Psicologo encontrado sql.js: ', results[0]);
            callback(null, results);
        }
        else{
            console.log('psicologo não encontrado');
        }
    })
}

/*Fim de consultas no Banco para Psicologos */

/*Inicio de Consultas para Recepcionista */

const verificarConsulta = (credencial, callback)=>{
    conexao.query(`select usuario.nome as NomePaciente, horario.hora, agenda.data, agenda.diaSemana, profissionalpsicologo.nome as NomePsico from horario inner join usuario on horario.idUser = usuario.idUser inner JOIN agenda on horario.idAgenda = agenda.idAgenda inner join profissionalpsicologo on agenda.idPsico = profissionalpsicologo.idPsico where usuario.nomeUser = ?`, [credencial], (error, results)=>{
        if(error) return console.log('Erro na Consulta: ', error);
        else if(results.length>0){
            console.log('usuario encontrado !', results);
            callback(null, results);
        }
        else{
            console.log('Usuário não encontrado!');
        }
    })
}

module.exports = {
    addUser,
    loginUser,
    getPsico,
    getHorario,
    updateHorario,
    getUser,
    updateUser,
    deleteHorario,
    getAgenda,
    addAgenda,
    deleteAgenda,
    getPsicoAgenda,
    getPsicoLogin,
    verificarConsulta
}