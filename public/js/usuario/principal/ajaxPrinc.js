$(document).ready(function(){
    
      //Tela principal quando clica em agendar consulta 
      $('#agendar').on('click', function(){
        var token = localStorage.getItem('token');
        console.log('token do ajax: ', token);
        $.ajax({
            url: '/user/principal/verificarToken',
            type: 'POST',
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .done(function(response){
            console.log(response);
            window.location.href = '/user/agendamento'
            
        })
        .fail(function(xhr, errorThrown,status){
            console.log('Falha na conexão com o servidor:', errorThrown)
            console.log('Status:', status);
            console.log(xhr);
        })
        .always(function(){
            console.log('Requisição finalizada');
        })
    })




    $('#conta').on('click', function(){
        var token = localStorage.getItem('token');
        console.log(token);
        $.ajax({
            url:'/user/principal/verificarToken',
            type: 'POST',
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
        .done(function(response){
            console.log('Token valido: ', response);
            window.location.href = '/user/principal/conta'
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