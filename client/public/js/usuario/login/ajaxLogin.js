document.addEventListener('DOMContentLoaded', function () {
    // Fetch para tela de login:
    document.getElementById('formLogin').addEventListener('submit', function (event) {
        event.preventDefault();

        const data = {
            emailUsuario: document.getElementById('emailUsuario').value,
            password: document.getElementById('password').value
        };

        console.log(data);

        fetch('http://localhost:3600/user/login', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro na solicitação. Status: ' + response.status);
            }
            return response.json();
        })
        .then(function (response) {
            console.log('Resposta do servidor: ', response);
            console.log('Token: ', response.token);
            console.log('idUser: ', response.response[0].idUser);

            // Salvar o token no localStorage:
            localStorage.setItem('token', response.token);

            // Salvar o idUser no localStorage:
            localStorage.setItem('idUser', response.response[0].idUser);

            verificarLogin(response.response[0]);
        })
        .catch(function (error) {
            console.error('Erro:', error.message);
        })
        .finally(function () {
            console.log('Requisição finalizada!');
        });
    });
    
    // Botão para se cadastrar:
    document.getElementById('buttonCadastrar').addEventListener('click', function () {
        window.location.href = '/user/cadastro';
    });
});
