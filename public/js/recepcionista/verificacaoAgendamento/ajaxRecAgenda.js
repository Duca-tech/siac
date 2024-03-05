var idHorario;

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

    $('#confirmarPresença').on('click', function(){
        console.log('Id Horario da Consulta: ', idHorario);
        
    })
})