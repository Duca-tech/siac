// public/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    const ctx = document.getElementById('consultas').getContext('2d');
    const users = document.getElementById('usuarios').getContext('2d');

    fetch('/adm/dash')
        .then(response => response.json())
        .then(data => {
            exibirConsultas(ctx, data);
            exibirUsuarios(users, data);
            selecionarConsulta(data);
            
        })
        .catch(error => console.error('Erro ao obter os dados:', error));

    
});
