// public/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    const ctx = document.getElementById('consultas').getContext('2d');
    const users = document.getElementById('usuarios').getContext('2d');
    const ag = document.getElementById('dashAgenda').getContext('2d');

    fetch('/adm/dash')
        .then(response => response.json())
        .then(data => {
            exibirConsultas(ctx, data);
            exibirUsuarios(users, data);
            selecionarConsulta(data);
            exibirAgendas(ag, data);
            
        })
        .catch(error => console.error('Erro ao obter os dados:', error));

    document.querySelector('.left-section .sign-out').addEventListener('click', function () {
        window.location.href = '/';
        
    });

    document.querySelector('.right-section .profile').addEventListener('click', function () {
        window.location.href = '/user/principal/conta';
    });

    document.querySelector('.left-section .sidebar .inicio').addEventListener('click', function(){
        window.location.href = '/user/principal';
    })
});


