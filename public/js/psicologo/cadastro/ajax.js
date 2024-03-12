$(document).ready(function () {
    $('#formCadastro').submit(function (e) {

        e.preventDefault();

        var nome = $('#nome').val();
        var email = $('#email').val();
        var cidade = $('#cidade').val();
        var senha = $('#senha').val();

        if (nome && email && cidade && senha) {
            var formulario = $(this).serialize();
            console.log('Dados do Formulário: ', formulario);
            $.ajax({
                url: '/psico/cadastro',
                type: 'POST',
                data: formulario
            })
                .done(function (response) {
                    console.log('Resposta do Servidor: ', response);
                    alert(response.message);
                    limparInput();


                })
                .fail(function (xhr, error, status) {
                    console.log('Status: ', status)
                    console.log('Error: ', error)
                    console.log(xhr);
                })
                .always(function () {
                    console.log('Requisição finalizada');
                })
        }
        else {
            alert('Preencha todos os campos de Cadastro')
        }
    })
})