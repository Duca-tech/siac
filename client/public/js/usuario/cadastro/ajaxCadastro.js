console.log('Script ajaxCadastro.js carregado.');

document.addEventListener('DOMContentLoaded', function () {
    
    //Carregar informações de CEP
    document.getElementById('cep').addEventListener('input', function () {
        console.log('comprimento do Cep: ', this.value.length);
        var cep = this.value;
        if (cep.length == 8) {
            fetch(`http://localhost:3600/user/buscarEndereco?cep=${cep}`)
                .then(response => response.json())
                .then(data => {
                    inserirEndereco(data);
                })
                .catch(error => {
                    console.error('erro: ', error);
                })

        }
    })

    // Evento de envio do formulário
    document.getElementById('formCadastroUser').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        console.log('Evento de envio do formulário detectado.');

        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var nomeUser = document.getElementById('nomeUser').value;
        var perfil = document.getElementById('perfil').value;
        var logradouroInput = document.getElementById('logradouroInput').value;
        var bairroInput = document.getElementById('bairroInput').value;
        var localidadeInput = document.getElementById('localidadeInput').value;
        var uf = document.getElementById('uf').value;
        var numero = document.getElementById('numero').value;
        var pass = document.getElementById('pass').value;
        var cep = document.getElementById('cep').value;
        var dataNascimento = document.getElementById('dataNascimento').value;

        if (nome && email && nomeUser && perfil != 'Escolha o Perfil' && cep && pass && numero) {
            const formData = {
                nome: nome,
                email: email,
                nomeUser: nomeUser,
                perfil: perfil,
                cep: cep,
                logradouro: logradouroInput,
                bairro: bairroInput,
                localidade: localidadeInput,
                uf: uf,
                numero: numero,
                senha: pass,
                dataNascimento: dataNascimento
            };

            fetch('http://localhost:3600/user/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao enviar formulário. Status: ' + response.status);
                    }
                    return response.json(); // Retorna os dados como JSON
                })
                .then(data => {
                    console.log('Resposta do servidor:', data);
                    verifcarCadastro(data.message, data.results ? data.results[0] : {});
                })
                .catch(error => {
                    console.error('erro: ', error);
                })
            return false; // Impede o envio padrão do formulário.
        }
        else {
            alert('Há campos em branco');
        }
    })
    // Fim da tela de cadastro do usuario!
})