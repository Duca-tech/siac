$(document).ready(function(){
     //tela de detalhes da conta do usuario
     var idUser = localStorage.getItem('idUser');
     console.log('idUser para pagina de detalhes de conta: ', idUser);
     var id = {
        idUser: idUser
     }
     
     $.ajax({
         url: '/user/principal/conta/detalhes',
         type: 'POST',
         data: id
     })
     .done(function(response){
         console.log('Resposta do Servidor: ', response.data);
         detalheConta(response.data);
         consultas(response.data);
     })
     .fail(function(xhr, status, errorThrown){
         console.log(xhr);
         console.log('status: ', status);
         console.log('error: ', errorThrown);
     })
     .always(function(){
         console.log('Requisição finalizada!');
     })

     
     //Atualizar conta
     $('#buttonAtualizar').on('click', function(){
        
        $('input').prop('disabled', false);

        $('#containerConfCan').css({
            'display':'block'
        })
        $('#buttonAtualizar').css({
            'display':'none'
        })

    })
    $('#buttonCancelar').on('click', function(){
       $('#containerConfCan').css({
            'display':'none'
        })
        $('#buttonAtualizar').css({
            'display':'inline'
        })
        $('input').prop('disabled', true);
    })

    $('#buttonConfirmar').on('click', function(){
        var nome = $('#nome').val();
        var email = $('#email').val();
        var celular = $('#celular').val();
        var nomeUser = $('#nomeUser').val();

        var usuario = {
            nome: nome,
            email: email,
            celular: celular,
            nomeUser: nomeUser
        }
        $.ajax({
            url: `/user/principal/conta/update/${idUser}`,
            type: 'PUT',
            data: usuario
        })
        .done(function(response){
            console.log('Resposta do servidor', response.message);
            updateRelizado(response.data)
        })
        .fail(function(xhr, status, errorThrown){
            console.log('Status: ', status);
            console.log('Error: ', errorThrown);
            console.log(xhr);
        })
        .always(function(){
            console.log('Requisição finalizada !');
        })
    })

    $('.voltar').on('click', function(){
        window.location.href =  '/user/principal'
    })
})