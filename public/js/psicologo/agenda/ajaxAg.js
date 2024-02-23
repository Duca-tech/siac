$(document).ready(function(){

    const idPsico = localStorage.getItem('idPsico');
    
    console.log('idPsico: ', idPsico);
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
                data: data,
                idPsico: idPsico
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
        var agendaDados = $(`<div class='d-flex align-items-center  justify-content-center row'></div>`)
        var agendaData = $(`<div class='col '></div>`);
        agendaData.append(`${agenda.data}`);
        agendaDados.append(agendaData);
        var diaSemana = $(`<div class='col '></div>`)
        diaSemana.append(`${agenda.diaSemana}`);
        agendaDados.append(diaSemana);
        var containerHora = $(`<div class='col '></div>`);
        agendaDados.append(containerHora);

        $.map(horarios, function(hora){
            containerHora.append(`<div class='btn btn-info' style='margin: 15px; display: inline-block'>${hora}</div>`)
        })

        $('#ContainerAgendaDados').append(agendaDados);
        $('#ContainerAgendaDados').animate({
            'height':'toggle'
        }, 1000, function(){
            $('#ContainerAgendaDados').css({'display':'block'})
        })

        $('#date').val('dd-mm-aaaa');
        $('#containerDiaSemana').css({'display':'none'})
        $('#horaIni').val('');
        $('#horaFin').val('');
        
    }


})