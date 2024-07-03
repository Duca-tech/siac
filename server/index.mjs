import express from 'express';
import {fileURLToPath} from 'url';
import {router} from './routes/routes.js';
import {routerUser} from './routes/routesUser.js';
import {routerPsico} from './routes/routesPsico.js';
import {routerRecep} from './routes/routesRecep.js';
import {routerAdm} from './routes/routesAdm.js';
import session from 'express-session';
import path from 'path';
import { config } from 'dotenv';

const app = express(); // Instancia a lib "express" que nada mais serve para tratar requisições cliente-servidor;
const porta = process.env.PORTA || 3600;
const chaveSecretaSession = process.env.SESSION_SECRET_KEY;
config(); // Acessar as variáveis globais no arquivo "config.env".

app.use(session({
    secret: chaveSecretaSession,
    resave: 'false', 
    saveUninitialized: true,
    cookie: {secure: false}
}))

// Middleware para analisar dados de formulário codificados como application/x-www-form-urlencoded:
app.use(express.urlencoded({extended:false}));

// Habilita o midleware json, analisa ao corpo das solicitações http como json. Precisa do Content-Type application/json.
app.use(express.json()) 

//fileURLToPath() para converter import.meta.url em um caminho de arquivo e dirname() para obter o diretório do arquivo atual
//import.meta.url para obter o diretório atual.
const __filename = fileURLToPath(import.meta.url);
console.log('Caminho do arquivo servidor: ', __filename);

const __dirname = path.dirname(__filename)

console.log('Dirname: ', __dirname);

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
app.use(express.static(path.join(__dirname, '..', 'client' , 'public')));

// Configure o diretório de views
app.set('views', path.join(__dirname, '..','client', 'views'));

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

// // Verificar token da página principal:
// app.use('/principal/verificarToken', router);

// Início do servidor para os perfis de usuário:
app.use('/user', routerUser)
app.use('/psico', routerPsico);
app.use('/recepcionista', routerRecep);
app.use('/adm', routerAdm);
// app.use('/recepcionista/:id')

app.listen(porta, ()=>{
    console.log(`Servidor iniciado: http://localhost:${porta}`);

    // const command = `start opera gx http://localhost:${porta}`; 
    // Módulo child_process (exec) do Node.js para executar um comando no sistema operacional que inicia o navegador.
    // exec(command, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Erro ao abrir o Opera GX: ${error}`);
    //         return;
    //     }
    //     console.log(`Opera GX iniciado!`);
    // });
})

export {
    session
}






 



