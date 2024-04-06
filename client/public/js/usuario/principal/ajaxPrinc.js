
var token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', function () {
    // Tela principal quando clica em agendar consulta:
    

    
    document.getElementById('agendar').addEventListener('click', function () {
        var idUser = localStorage.getItem('idUser');
        var token = localStorage.getItem('token');
        console.log('Id do usuario: ', idUser);
        console.log('token do ajax: ', token);
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
            console.log('resposta do servidor: ', response);
            verificaoConsulta(response.data);
            // window.location.href = '/user/agendamento'
        })
        .catch(function (error) {
            console.error('Falha na conexão com o servidor:', error.message);
        })
        .finally(function () {
            console.log('Requisição finalizada');
        });
    });

    document.getElementById('conta').addEventListener('click', function () {
        var token = localStorage.getItem('token');
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
            console.log('Token validado com sucesso');
            window.location.href = '/user/principal/conta';
        })
        .catch(function (error) {
            console.error('Falha na requisição!', error.message);
        })
        .finally(function () {
            console.log('Requisição Finalizada!');
        });
    });

    $('.containerGeral').on('click', '.logout', function(e){
        e.preventDefault();
        console.log('clicado!');
        window.location.href = '/'
        
    })
  

    document.getElementById('criarAgenda').addEventListener('click', function(){
        console.log('evento de gerar agenda')

        fetch('http://localhost:3600/psico/principal/verificarToken', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Verificação de token bem sucedida', data);
            window.location.href = '/psico/principal/agenda'
        })
        .catch(error=>{
            console.error('Erro: ', error)
        })
        .finally(()=>{
            console.log('Requisição finalizada')
        })
    
    })
    

});
