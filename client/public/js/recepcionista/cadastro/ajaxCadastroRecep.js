document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('formCadastroRecep').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário.

        // Obtém os dados do formulário:
        const formData = new FormData(this);

        // Envia a requisição Fetch:
        fetch('http://localhost:3600/recepcionista/cadastro', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response falhou.');
                }
                return response.json();
            })
            .then(response => {
                console.log('Recepcionista cadastrado com sucesso: ', response);
                
                // Redireciona para a página de login ou outra página desejada:
                window.location.href = '/recepcionista/login';
            })
            .catch(error => {
                console.error('Erro ao cadastrar recepcionista: ', error);
            });
    });
});
