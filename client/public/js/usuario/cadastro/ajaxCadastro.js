console.log('Script ajaxCadastro.js carregado.');

document.addEventListener('DOMContentLoaded', function() {
    // Evento de envio do formulário
    document.getElementById('formCadastroUser').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        console.log('Evento de envio do formulário detectado.');

        const formData = new FormData(this);
        console.log(formData)

        fetch('http://localhost:3600/user/cadastro', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário. Status: ' + response.status);
            }
            return response.json(); // Retorna os dados como JSON
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
            // Faça algo com a resposta, se necessário
        })
        .alwxays(function(){
            console.log('A requisição ajax foi feita!');
        })
        return false; // Impede o envio padrão do formulário.
    })
    // Fim da tela de cadastro do usuario!
})