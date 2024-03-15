$(document).ready(function(){
    const token = localStorage.getItem('token');
    console.log('Token Armazenado: ', token);
    $('#criarAgenda').on('click', function(){
        
        $.ajax({
            url:'/psico/principal/verificarToken',
            type: 'GET',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
            //xhr é um objeto XMLHttpRequest, que é um objeto fornecido pelo navegador que permite fazer solicitações HTTP de forma assíncrona a um servidor. É uma parte essencial do AJAX, que permite que páginas da web atualizem partes específicas sem precisar recarregar a página inteira.

            //função beforeSend é uma função de retorno de chamada fornecida pelo jQuery que é chamada antes de enviar a solicitação AJAX. Dentro dessa função de retorno de chamada, xhr é o objeto XMLHttpRequest que está sendo usado para fazer a solicitação. Portanto, ao chamar xhr.setRequestHeader, você está definindo um cabeçalho personalizado para a solicitação AJAX, que neste caso é o cabeçalho de autorização com o token JWT.
            
        })
        .done(function(response){
            console.log('Token valido: ', response);
            window.location.href = '/psico/principal/agenda'
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