$(document).ready(function(){
    // Ajax para tela de login 
    $('#formLogin').on('submit',function(event){
        event.preventDefault();
        const data = {
            emailUsuario: $('#emailUsuario').val(),
            password: $('#password').val()
        }
        console.log(data);
        $.ajax({
            url: 'http://localhost:3600/user/login',
            type: 'POST',
            data: data
        })
        .done(function(response){
            console.log('token recebido', response.token);
            
            // Salvar o token no localstorage
            localStorage.setItem('token', response.token);

            // Salvar o idUser no localstorage
            localStorage.setItem('idUser', response.idUser);
            
            window.location.href = '/user/principal';
        })
        .fail(function(xhr, status, errorThrown){
            console.log('erro: ', errorThrown);
            console.log('status: ', status)
            console.log(xhr);
        })
        .always(function(){
            console.log('Requisição finalizada!');
        })
        return false;
    })
    // Fim da tela de login do usuario

    // Botão para se cadastrar
    $('#buttonCadastrar').on('click', function(){
        window.location.href = '/user/cadastro';
    })
})