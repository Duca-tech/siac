
var idUser = localStorage.getItem('idUser');
var token = localStorage.getItem('token');
var perfil = localStorage.getItem('perfil');
document.addEventListener('DOMContentLoaded', function () {
    // Tela principal quando clica em agendar consulta:
    

    
    document.getElementById('agendar').addEventListener('click', function () {
        
        
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

    document.getElementById('conta').addEventListener('click', function () {

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

    document.querySelector('.containerUser').addEventListener('click', function (e) {
        if (e.target.classList.contains('logout')) {
            e.preventDefault();
            var logout = e.target.dataset.id;
            console.log('Logout: ', logout);
            window.location.href = '/';
        }
    });

    document.getElementById('criarAgenda').addEventListener('click', function(){
        fetch(`http://localhost:3600/user/principal/verificarToken/${idUser}`, {
            method:'GET',
            headers:{ 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Resposta do Servidor: ', data)
            // window.location.href = '/psico/principal/agenda'
            
        })
        .catch(error=>{
            console.error(error)
        })
        .finally(()=>{
            console.log('Requisição Finalizada !');
        })
    })

    $('.containerUser').on('click', '#logout', function(e){
        e.preventDefault();
        window.location.href = '/'
    })
});
