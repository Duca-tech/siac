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

            })
            .fail(function(status, errorThrown, xhr){
                console.log('Status: ', status);
                console.log('error: ', errorThrown);
                console.log(xhr);
            })
            .always(function(){
                console.log('Requisição Finalizada');
            })
        }
    })
})