// const express = require('express'); // Puxando a lib "express".
import express from 'express';
import {fileURLToPath} from 'url';
import {router} from './routes/routes.js';
import {routerUser} from './routes/routesUser.js';
import {routerPsico} from './routes/routesPsico.js';
import {routerRecep} from './routes/routesRecep.js'
import {session} from './routes/routes.js';
const app = express(); // Instancia a lib "express" que nada mais serve para tratar requisições cliente-servidor.
import {exec} from 'child_process';
import path from 'path';
import { config } from 'dotenv';
config(); // Acessar as variáveis globais no arquivo "config.env".
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

//fileURLToPath() para converter import.meta.url em um caminho de arquivo e dirname() para obter o diretório do arquivo atual
//import.meta.url para obter o diretório atual.
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

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


// -------------------- INÍCIO DO SERVIDOR PARA USUÁRIO:
app.use('/user', routerUser)

// -------------------- INÍCIO DO SERVIDOR PARA PSICOLOGO:
app.use('/psico', routerPsico);

// -------------------- INÍCIO DO SERVIDOR PARA RECEPCIONISTA:
app.use('/recepcionista', routerRecep);


// Teste Edu - Rota criada para abordagem Fetch API:
// app.use('/recepcionista/:id')
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




 



