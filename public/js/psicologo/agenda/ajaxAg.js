$(document).ready(function(){

    

    $('#gerarAgenda').on('click', function(){
        
        var horaIni = $('#horaIni').val();
        var horaFin= $('#horaFin').val();
        var diaSemana = $('#diaSemana').val();
        var data = $('#date').val();


        if(horaIni == ''|| horaFin =='' || data ==''){
            alert('Precisa deixar todos os campos completos para gerar a agenda')
        }
        else{
            var agenda = {
                horaIni: horaIni,
                horaFin: horaFin,
                diaSemana: diaSemana,
                data: data
            }
            $.ajax({
                url: '/psicologo/gerarAgenda',
                type: 'POST',
                data: agenda
            })
            .done(function(response){
                console.log('Resposta do servidor: ', response.message ,response.agenda, response.horarios);
                exibirAgenda(response.agenda, response.horarios)
            })
            .fail(function(status, xhr, errorThrown){
                console.log('Status: ', status);
                console.log('Erro: ', errorThrown);
                console.log(xhr);
            })
            .always(function(){
                console.log('Requisição finalizada!');
            })

        }
    })

    function exibirAgenda(agenda, horarios){
        console.log('dia da semana: ', agenda.diaSemana)
        console.log('Data: ', agenda.data)
        console.log('Horarios: ', horarios)
        $('#data').append(`<div>${agenda.data}</div>`);
        $('#agendaDiaSemana').append(`<div>${agenda.diaSemana}</div>`);

        $.map(horarios, function(hora){
            $('#agendaHorarios').append(`<div>${hora}</div>`)
        })

    }


})