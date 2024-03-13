$(document).ready(function () {
    $('#entrar').on('click', function (e) {
        e.preventDefault();
        var email = $('#email').val();
        var senha = $('#senha').val();

        console.log(email, senha);

        if (!email || !senha) {
            alert('Preencha todos os campos!')
        }
        else {

            var psicoLogin = {
                email: email,
                senha: senha
            }

            $.ajax({
                url: '/psico/login',
                type: 'POST',
                data: psicoLogin

            })
                .done(function (response) {
                    console.log(' Resposta do servidor: ', response.token, response.psico);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('idPsico', response.psico.idPsico)
                    window.location.href = '/psico/principal'
                })
                .fail(function (status, xhr, errorthrown) {
                    console.log('Status: ', status);
                    console.log('Erro: ', errorthrown);
                    console.log(xhr);
                })
                .always(function () {
                    console.log('Requisição Finalizada');
                })
        }
    })
})