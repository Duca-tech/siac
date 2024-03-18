document.addEventListener('DOMContentLoaded', function () {
    
    // Fetch para tela de cadastro usuário:
    document.getElementById('formCadastroUser').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário.

        const dadosUser = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            nomeUser: document.getElementById("nomeUser").value,
            password: document.getElementById("pass").value
        };

        fetch('http://localhost:3600/user/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar usuário: ' + response.status);
                }
                window.location.href = '/user/login';
            })
            .then((json) => {
                console.log('Usuário adicionado com sucesso!', json);
            })
            .catch(error => {
                console.error('Erro ao adicionar usuário:', error);
            })
            .finally(() => {
                console.log('A requisição fetch foi feita!');
            });
    });
    // Fim da tela de cadastro do usuário!
});