$(document).ready(function(){
    const token = localStorage.getItem('token');
    console.log('Token Armazenado: ', token);
    $('#criarAgenda').on('click', function(){
        
        $.ajax({
            url:'/principal/verificarToken',
            type: 'POST',
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .done(function(response){
            console.log('Token valido: ', response);
            window.location.href = '/psicologo/principal/agenda'
        })
        .fail(function(xhr, status, errorThrown){
            console.log('Falha na requisição!');
            console.log(xhr);
            console.log('status: ', status);
            console.log('Erro: ', errorThrown);
        })
        .always(function(){
            console.log('Requisição Finalizada!');
        })
    })

})