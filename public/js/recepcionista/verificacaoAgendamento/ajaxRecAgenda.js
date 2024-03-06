var idHorario;
var idUser;

$(document).ready(function(){
    
    $('#buttonVerify').on('click', function(){
        var inputCred = $('#inputVerify').val();
        if(!inputCred){
            alert('Não há nada no campo busca de Credenciais');
        }
        else{
            var credencial = {
                inputCred: inputCred
            }
            $.ajax({
                url: '/recepcionista/principal/verificarConsulta',
                type: 'POST',
                data: credencial
            })
            .done(function(response){
                console.log('Resposta do Servidor!', response);
                verificarConsulta(response.consulta[0]);
                idHorario = response.consulta[0].idHorario;
                idUser = response.consulta[0].idUser;

            })
            .fail(function(errorThrown, status,  xhr){
                console.log('Status: ', status);
                console.log('error: ', errorThrown);
                console.log(xhr);
            })
            .always(function(){
                console.log('Requisição Finalizada');
            })
        }
    })

    //elemento pai é o DOM
    $(document).on('click', '#confirmarPresença',function(){
        console.log('Id Horario da Consulta: ', idHorario);
        console.log('Id User: ', idUser);
        var horario = {
            idHorario: idHorario,
            idUser: idUser
        }
        
        $.ajax({
            url:'/recepcionista/principal/verificarConsulta/confirmarPresenca',
            type: 'POST',
            data: horario
        })
        .done(function(response){
            console.log('Resposta do Servidor: ', response);
            console.log('Dados: ', response.dados[0])
            putConsulta(response.dados[0]);
        })
        .fail(function(errorThrown,status,xhr){
            console.log('Falha na Requisição: ', errorThrown)
            console.log('Status: ', status)
            console.log(xhr);
        })
        .always(function(){
            console.log('Requisição Finalizada!');
        })
    })
})