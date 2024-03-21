

console.log('Script ajaxCadastro.js carregado.');

document.addEventListener('DOMContentLoaded', function() {

    //evento de envio de cep para o Servidor
    document.getElementById('cep').addEventListener('input', function(){
        var cep = this.value.replace('/\D/g', ''); // remove os caracteres não numéricos
        console.log('Length Cep: ', cep.length);
        if(cep.length == 8){
            console.log('Cep: ', cep);
            fetch(`http://localhost:3600/user/buscarEndereco?cep=${cep}`)
            .then(response=> response.json())
            .then(data =>{
                inserirEndereco(data);
            })
            .catch(error=>{
                console.error('Erro ao Buscar Endereço ', error);
            })
        }
    })

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
        .catch(error => {
            console.error('Erro ao enviar formulário:', error);
        });
    });
});
