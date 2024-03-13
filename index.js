const express = require('express'); // Puxando a lib "express".
const {router} = require('./config/routes/routes');
const {session} = require('./config/routes/routes');
const app = express(); // Instancia a lib "express" que nada mais serve para tratar requisições cliente-servidor.
// const open = require('open'); // Renderizar para Google Chrome.
// const open = require('open'); // Renderizar para Firefox.
const {exec} = require('child_process');
const path = require('path');
require('dotenv').config(); // Acessar as variáveis globais no arquivo "config.env".
const porta = process.env.PORTA || 3600;
const chaveSecretaSession = process.env.SESSION_SECRET_KEY;

app.use(session({
    secret: chaveSecretaSession,
    resave: 'false', // O que é isso?
    saveUninitialized: true // O que é isso?

}))

// Middleware para analisar dados de formulário codificados como application/x-www-form-urlencoded:
app.use(express.urlencoded({extended:false}));

// Habilita o midleware json, analisa ao corpo das solicitações http como json. Precisa do Content-Type application/json.
app.use(express.json()) 

// Configurar o MIME adequado para o arquivo jS:
app.use('/js', (req,res,next)=>{
    // Definir o cabeçalho de resposta HTTP para a resposta que será enviada de volta ao cliente:
    res.set('Content-Type', 'text/javascript');
    next();
})

// Configurar MIME adequado para CSS:
app.use('/css', (req,res,next)=>{
    res.set('Content-Type', 'text/css');
    next();
})

// Middleware para servir os arquivos estáticos do diretório 'public':
app.use(express.static(path.join( __dirname, 'public')))

// Habilitando CORS
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/* Express procurará por arquivos com extensão .ejs na pasta de visualizações e usará o mecanismo EJS 
para renderizá-los. Se você tem um arquivo chamado pagina.ejs em sua pasta de visualizações, você pode
renderizá-lo no Express usando o método render e o nome do arquivo sem a extensão: */
app.set('view engine', 'ejs'); 

// Acessa o arquivo router e inicia a renderização da página principal:
app.use('/', router);  

// Verificar token da página principal:
app.use('/principal/verificarToken', router);


// -------------------- INÍCIO DO SERVIDOR PARA USUÁRIO:
// Cadastrar usuário:
app.use('/user/cadastro', router); // Tem que usar caminho absoluto.

// Gerar token para usuário:
app.use('/user/login', router);

// Abrir página principal:
app.use('/user/principal', router);

// Abrir página de agendamento:
app.use('/user/agendamento', router);

// Puxar os dados do psicólogo do banco:
app.use('/user/agendamento/dadosPsico', router);

// Usuário clicou no botão do horário e o banco vai fazer um "INSERT INTO" no banco:
app.use('/user/inserirHorario', router);

app.use('/user/inserirHorario/wpp', router);

// Renderizar a página da conta do usuário:
app.use('/user/principal/conta', router);

// Puxar os dados do usuário do banco de dados:
app.use('/user/principal/conta/detalhes', router);

// Atualizar os dados do usuário:
app.use('/user/principal/conta/update', router);

app.use('/user/principal/conta/deletarConsulta', router);
// Fim servidor para usuário!

// Inicio servidor para psicólogo:
// Gerar agenda para psicólogo:
app.use('/psicologo/gerarAgenda', router);

// Exibir a agenda criada quando acessa a página de agenda
app.use('/psico/agenda/exibirAgenda', router);

// Psicólogo insere as crendicais de login
app.use('/psico/login', router )

// Cadastro das informações de psicólogo
app.use('/psico/cadastro', router)

app.use('/psico/principal', router);

app.use('/psicologo/principal/agenda', router);

// Psicólogo deleta alguma agenda criada
app.use('/psico/agenda/deletarAgenda', router);

app.use('/psico/principal/verificarToken', router);
// -------------------- FIM DO SERVIDOR PARA PSICÓLOGO!


// -------------------- INÍCIO DO SERVIDOR PARA RECEPCIONISTA:
app.use('/recepcionista/principal/verificarConsulta', router);

app.use('/recepcionista/principal/verificarConsulta/confirmarPresenca', router);

// Teste Edu - Rota criada para abordagem Fetch API:
app.use('/recepcionista/:id')
// -------------------- FIM DO SERVIDOR PARA RECEPCIONISTA! 

app.listen(porta, ()=>{
    console.log(`Servidor iniciado: http://localhost:${porta}`);

    const command = `start opera gx http://localhost:${porta}`; 
    // Módulo child_process (exec) do Node.js para executar um comando no sistema operacional que inicia o navegador.
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao abrir o Opera GX: ${error}`);
            return;
        }
        console.log(`Opera GX iniciado!`);
    });


})


