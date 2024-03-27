// import {verificacao} from '/js/usuario/agendamento/funcaoAg.js'
$(document).ready(function(){
    
    idUser = localStorage.getItem('idUser');
    
    $.ajax({
        url:'/user/agendamento/dadosPsico',
        type: 'GET'
    })
    .done(function(data){
        console.log('Psicologos, agenda e horários:  ', data);
        verificacao(data.psicologos, data.agenda, data.horarios);
        selecionarPsico(data.psicologos);
        firstGenerateCalendar(data.agenda, data.horarios);
        SelectMonthGenerateCalendar(data.agenda, data.horarios);
        
        
        
    })
    .fail(function(xhr, status, errorThrowne){
        console.log('status: ', status);
        console.log('error: ', errorThrowne);
        console.log(xhr);
    })
    .always(function(){
        console.log('Requisição Finalizada');
    })

    // Variável global:
    var hora;
    var idUser;
    var button;
    var msgWpp;

    $('#containerAgenda').on('click', '.buttonHora', function(){
        button = $(this);
        hora = $(this).text();
        console.log('Id do Usuario: ', idUser);
        $('#containerConfirmacao').css({
            'display':'block'
        })
        $('#containerAgenda').css({
            'display':'none'
        })

    })
    
    $('#containerConfirmacao').on('click', 'button', function(){ // Inicio do AJAX para confirmar agendamento.
        console.log('Id do usuário: ', idUser);
        console.log('button: ', hora);
        msgWpp = $('#msgWpp')

        if(msgWpp.prop('checked')){ // Método .prop('checked') retorna true se o checkbox estiver marcado e false caso contrário.

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
                $('#containerMsgWpp').animate({
                    'opacity':'0'
                },1000, function(){
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
                                window.location.reload();
                            });
                        });
                    });
                })
                window.location.href = '/user/principal'
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
                            window.location.reload();

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
    }) // Fim do AJAX para confirmar agendamento!

    $('#voltar').on('click', function(){
        window.location.href = '/user/principal';
    })


})