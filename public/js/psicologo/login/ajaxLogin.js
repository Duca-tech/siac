$(document).ready(function(){

    $('#entrar').on('click', function(){
        var email = $('#email').val();
        var senha = $('#senha').val();

        if(!email || !senha) return alert('Preencha todos os campos!')

        var psicoLogin = {
            email: email,
            senha: senha
        }

        $.ajax({
            url: '/psico/login',
            type: 'POST',
            data: psicoLogin
                                                
        })
        .done(function(response){
            console.log(' Resposta do servidor: ', response);
            window.location.href = '/psico/principal'
        })
        .fail(function(status, xhr, errorthrown){
            console.log('Status: ', status);
            console.log('Erro: ', errorthrown);
            console.log(xhr);
        })
        .always(function(){
            console.log('Requisição Finalizada');
        })

    })

})