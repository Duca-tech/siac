const express = require('express'); // puxando a lib express
const  {router}  = require('./config/routes/routes');
const {session} = require('./config/routes/routes');
const app = express(); // instancia a lib express que nada mais serve para tratar requisições cliente-servidor
// const opn = require('opn'); // para renderizar para o google chrome
// const open = require('open'); // renderizar firefox
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config(); // acessar as variaveis globais no arquivo config.env
const porta = process.env.PORTA ||  3600;
const chaveSecretaSession = process.env.SESSION_SECRET_KEY;


app.use(session({
    secret: chaveSecretaSession,
    resave: 'false', // o que é isso
    saveUninitialized: true // o que é isso

}))



// Middleware para analisar dados de formulário codificados como application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));


app.use(express.json()) // habilita o midleware json, analisa ao corpo das solicitações http como json. Precisa do Content-Type application/json.

// configurar o MIME adequado para o arquivo jS
app.use('/js', (req,res,next)=>{
    //definir o cabeçalho de resposta HTTP para a resposta que será enviada de volta ao cliente
    res.set('Content-Type', 'text/javascript');
    next();
})

// Configurar MIME Adequado para CSS
app.use('/css', (req,res,next)=>{
    res.set('Content-Type', 'text/css');
    next();
})

// Middleware para servir os arquivos estáticos do diretório 'public'
app.use(express.static(path.join( __dirname, 'public')))

// habilitando CORS
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.set('view engine', 'ejs'); // Express procurará por arquivos com extensão .ejs na pasta de visualizações e usará o mecanismo EJS para renderizá-los.  se você tem um arquivo chamado pagina.ejs em sua pasta de visualizações, você pode renderizá-lo no Express usando o método render e o nome do arquivo sem a extensão:

app.use('/', router); // acessa o arquivo router e inicia a renderização da pagina principal 

// Verificar Token da pagina Principal
app.use('/principal/verificarToken', router);


/*******Inicio Servidor Para Usuario*******/

// Cadastrar usuario
app.use('/user/cadastro', router); // tem que usar caminho absoluto

// gerar token Usuario
app.use('/user/login', router);

// abrir pagina principal
app.use('/user/principal', router);

// abrir pagina de Agendamento
app.use('/user/agendamento', router);

// puxar os dados da psico do banco
app.use('/user/agendamento/dadosPsico', router);

// usuário clicou no botão do horario e o banco vai fazer um insert into no banco
app.use('/user/inserirHorario', router);

app.use('/user/inserirHorario/wpp', router);

// Renderizar a pagina da conta do usuário
app.use('/user/principal/conta', router);

// Puxar os dados do usuário ddo Banco de dados
app.use('/user/principal/conta/detalhes', router);

// atualizar os dados do usuario
app.use('/user/principal/conta/update', router);

app.use('/user/principal/conta/deletarConsulta', router);

/*******Fim Servidor Para Usuario*******/


/*Inicio Servidor para Psicologo */

// gerar agenda para psicologo
app.use('/psicologo/gerarAgenda', router);

// Exibir a agenda criada quando acessa a pagina de agenda
app.use('/psico/agenda/exibirAgenda', router);

// psico inseri as crendicais de login
app.use('/psico/login', router )

//cadastro das Informações de Psico
app.use('/psico/cadastro', router)

app.use('/psico/principal', router);

app.use('/psicologo/principal/agenda', router);

// Psico deleta alguma agenda Criada
app.use('/psico/agenda/deletarAgenda', router);

app.use('/psico/principal/verificarToken', router);

/*Fim servidor para Psicologo */

/* Inicio Servidor para Recepcionista */

app.use('/recepcionista/principal/verificarConsulta', router);

app.use('/recepcionista/principal/verificarConsulta/confirmarPresenca', router);

/**Fim do Servidor para Recepcionista */
app.listen(porta, ()=>{
    console.log(`servidor iniciado: http://localhost:${porta}`);

    const command = `start opera gx http://localhost:${porta}`; // módulo child_process (exec) do Node.js para executar um comando no sistema operacional que inicia o navegador.
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao abrir o Opera GX: ${error}`);
            return;
        }
        console.log(`Opera GX iniciado`);
    });


})


