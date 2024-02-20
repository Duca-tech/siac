$(document).ready(function(){
    
    $.ajax({
        url:'/user/agendamento/dadosPsico',
        type: 'GET'
    })
    .done(function(data){
        console.log('Psicologos e agenda: ', data);
        mostrarPsico(data.psicologos);
        psicoAgenda(data.psicologos);

        //Mostrar agenda
        mostrarData(data.agenda[0]);
        mostrarDiaSemana(data.agenda[0]);
        intervaloHorarios(data.agenda[0]);
    })
    .fail(function(xhr, status, errorThrowne){
        console.log('status: ', status);
        console.log('error: ', errorThrowne);
        console.log(xhr);
    })
    .always(function(){
        console.log('Requisição Finalizada');
    })

    //variavel global
    var hora;
    var idUser;
    var button;
    var msgWpp;

    $('#containerAgenda').on('click', 'button', function(){
        button = $(this);
        hora = $(this).text();
        idUser = localStorage.getItem('idUser');
        $('#containerConfirmacao').css({
            'display':'block'
        })
        $('#containerAgenda').css({
            'display':'none'
        })

    })
    
    $('#containerConfirmacao').on('click', 'button', function(){
        console.log('Id do usuário: ', idUser);
        console.log('button: ', hora);
        msgWpp = $('#msgWpp')

        if(msgWpp.prop('checked')){ //método .prop('checked') retorna true se o checkbox estiver marcado e false caso contrário.

            button.css({
                'display':'none'
            })
            var data = {
                idUser: idUser,
                hora: hora
            }

            console.log('Objeto data: ', data)
            $.ajax({
                url: '/user/inserirHorario/wpp',
                type: 'POST',
                data: data
            })
            .done(function(resultServer){
                console.log(resultServer);
                $('#containerConfirmacao button').css({
                    'display': 'none'
                });
                $('#containerConfirmacao h5').animate({
                    'opacity': 'toggle',
                    'height': 'toggle'
                }, 1000, function() {
                    $('#containerConfirmacao').animate({
                        'opacity': '0'
                    }, 1000, function() {
                        $('#containerConfirmacao').css({
                            'display': 'none'
                        });
                        $('#containerAgenda').animate({
                            'height': 'toggle',
                            'opacity': 'toggle'
                        }, 1000, function(){
                            window.location.href = '/user/principal'

                        });
                    });
                });
            })
            .fail(function(status, xhr, errorThrown){
                console.log('status: ', status);
                console.log(xhr);
                console.log('error: ', errorThrown);
            })
            .always(function(){
                console.log('Requisição finalizada');
            })
        }
        else{
            button.css({
                'display':'none'
            })
            var data = {
                idUser: idUser,
                hora: hora
            }

            console.log('Objeto data: ', data)
            $.ajax({
                url: '/user/inserirHorario',
                type: 'POST',
                data: data
            })
            .done(function(resultServer){
                console.log(resultServer);
                $('#containerConfirmacao button').css({
                    'display': 'none'
                });
                $('#containerConfirmacao h5').animate({
                    'opacity': 'toggle',
                    'height': 'toggle'
                }, 1000, function() {
                    $('#containerConfirmacao').animate({
                        'opacity': '0'
                    }, 1000, function() {
                        $('#containerConfirmacao').css({
                            'display': 'none'
                        });
                        $('#containerAgenda').animate({
                            'height': 'toggle',
                            'opacity': 'toggle'
                        }, 1000, function(){
                            window.location.href = '/user/principal'

                        });
                    });
                });
            })
            .fail(function(status, xhr, errorThrown){
                console.log('status: ', status);
                console.log(xhr);
                console.log('error: ', errorThrown);
            })
            .always(function(){
                console.log('Requisição finalizada!');
            })
        }
    })


})