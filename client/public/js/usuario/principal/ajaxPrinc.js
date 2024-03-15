$(document).ready(function(){
      // Tela principal quando clica em agendar consulta: 
      $('#agendar').on('click', function(){
        var idUser = localStorage.getItem('idUser');
        var token = localStorage.getItem('token');
        console.log('Id do usuario: ', idUser);
        console.log('token do ajax: ', token);
        var id = {
            idUser: idUser
        }
        $.ajax({
            url: '/user/principal/verificarToken',
            type: 'POST',
            headers: {
                'authorization': 'Bearer ' + token
            },
            data: id
        })
        .done(function(response){
            console.log('resposta do servidor: ',response);
            verificaoConsulta(response.data);
            // window.location.href = '/user/agendamento'  
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
            type: 'GET',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
            /* xhr é um objeto XMLHttpRequest, que é um objeto fornecido pelo navegador que permite fazer solicitações HTTP de forma 
            assíncrona a um servidor. É uma parte essencial do AJAX, que permite que páginas da web atualizem partes específicas sem 
            precisar recarregar a página inteira. */

            /* Função "beforeSend" é uma função de retorno de chamada fornecida pelo jQuery que é chamada antes de enviar a solicitação
            AJAX. Dentro dessa função de retorno de chamada, xhr é o objeto XMLHttpRequest que está sendo usado para fazer a solicitação.
            Portanto, ao chamar xhr.setRequestHeader, você está definindo um cabeçalho personalizado para a solicitação AJAX, que neste 
            caso é o cabeçalho de autorização com o token JWT. */
            
        })
        .done(function(){
            console.log('Token validado com sucesso');
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

    $('.containerUser').on('click', '.logout', function(e){
        e.preventDefault();
        var logout = $(this).data('id');
        console.log('Logout: ', logout);
        window.location.href = '/user/login'
    })

})