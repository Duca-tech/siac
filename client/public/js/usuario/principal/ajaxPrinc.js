
var idUser = localStorage.getItem('idUser');
var token = localStorage.getItem('token');
var perfil = localStorage.getItem('perfil');
document.addEventListener('DOMContentLoaded', function () {
    // Tela principal quando clica em agendar consulta:
    var id ={
        idUser: idUser
    }
    fetch('/user/principal/conta/detalhes',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(id)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log('Resposta do Servidor: ', data);
        detalheUser(data.data[0]);
    })
    .catch(error=>{
        console.error('erro: ', error);
    })
    .finally(()=>{
        console.log('Requisição finalizada!');
    })

    document.querySelector('.left-section .sidebar .dashboard').addEventListener('click', function(){
        window.location.href = '/user/dash';
    })

    
    document.querySelector('.main .quick-access .item').addEventListener('click', function () {
        
        
        console.log('Id do usuário: ', idUser);
        console.log('Token: ', token);
        console.log('perfil: ', perfil);
        
        var id = {
            idUser: idUser
        };

        fetch('/user/principal/verificarToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(id)
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro na solicitação. Status: ' + response.status);
            }
            return response.json();
        })
        .then(function (response) {
            console.log('Resposta do servidor: ', response);
            verificaoConsulta(response.data, perfil);
        })
        .catch(function (error) {
            console.error('Falha na conexão com o servidor. Status: ', error.message);
        })
        .finally(function () {
            console.log('Requisição finalizada!');
        });
    });

    document.querySelector('.right-section .profile').addEventListener('click', function () {

        console.log(token);
        
        fetch('/user/principal/verificarToken', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro na solicitação. Status: ' + response.status);
            }
            return response.json();
        })
        .then(function () {
            console.log('Token validado com sucesso!');
            window.location.href = '/user/principal/conta';
        })
        .catch(function (error) {
            console.error('Falha na requisição. Status: ', error.message);
        })
        .finally(function () {
            console.log('Requisição finalizada!');
        });
    });

    document.querySelector('.left-section .sign-out').addEventListener('click', function () {
            window.location.href = '/';
        
    });

    document.getElementById('criar-agenda').addEventListener('click', function(){
        var id ={
            idUser: idUser
        }
        fetch(`/user/principal/verificarToken`, {
            method:'GET',
            headers:{ 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: id
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Resposta do Servidor: ', data)
            verificaoConsulta(response.data, perfil);
            
        })
        .catch(error=>{
            console.error(error)
        })
        .finally(()=>{
            console.log('Requisição Finalizada !');
        })
    })

    $('#logout').on('click', function(e){
        e.preventDefault();
        window.location.href = '/'
    })

    document.getElementById('verificarAgenda').addEventListener('click', function(){
        window.location.href = '/recepcionista/principal/verificarConsulta'
    })

    document.getElementById('criar-agenda').addEventListener('click', function(){
        window.location.href = '/psico/principal/agenda'
    })
});
