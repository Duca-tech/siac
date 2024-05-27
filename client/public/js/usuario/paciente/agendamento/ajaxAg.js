// import {verificacao} from '/js/usuario/agendamento/funcaoAg.js'
$(document).ready(function(){
    
    idUser = localStorage.getItem('idUser');
    
    $.ajax({
        url:'/user/agendamento/dadosPsico',
        type: 'GET'
    })
    .done(function(data){
        console.log('Psicologos, agenda e horários:  ', data);
        if(data.message = 'Sem psicólogos cadastrados'){
            alert(data.message);
            window.location = '/';
        }
        
        verificacao(data.psicologos, data.agenda, data.horarios);
        selecionarPsico(data.psicologos);
        // firstGenerateCalendar(data.agenda, data.horarios);
        searchCalendar(data.agenda, data.horarios);
        SelectMonthGenerateCalendar(data.agenda, data.horarios);
        // search(data.agenda, data.horarios, data.psicologos);
        
        
        
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


    var search = document.querySelector('.search');
  search.addEventListener('click', function(){

    var data = document.querySelector('.data').value;
    var diaSemanaSelect = document.querySelector('.selectDiaSemana').value
    var diaSemanaInput = document.querySelector('.diaSemana').value
    var hora = document.querySelector('.hora').value
    var psico = document.getElementById('selecionePsico').value
    var diaSemana

    if(diaSemanaInput && diaSemanaInput != 'Invalid Date'){
        diaSemana = diaSemanaInput
    } 
    else{
        diaSemana = diaSemanaSelect
    }

    if(diaSemana == 'Dia da Semana') diaSemana = '';
    if(psico =='Selecione Profissional') psico = '';
     

    console.log('data: ', data);
    console.log('diaSemana: ', diaSemana);
    console.log('hora: ', hora);
    console.log('psico: ',psico);  

    var dados = {
      data: data,
      diaSemana: diaSemana,
      hora: hora,
      psico: psico
    }

    var post = {
      method: 'POST',
      headers:{
        'Content-Type': 'Application/json' //Dados enviados são json
      },
      body: JSON.stringify(dados)
    }

    fetch('http://localhost:3600/user/principal/agendamento/buscar', post)
    .then(response=> response.json())
    .then(data => {
      console.log('Dados recebidos: ', data)
      console.log('Data.dados: ', data.dados)
      verificacaoHorario(data.dados);
    //   var [agenda, horarios, psicos] = eliminarElementosDuplicados(data.dados)
    //   searchCalendar(agenda, horarios, psicos);
    })
    .catch(error=>{
      console.error('Erro: ', error)
    })
    .finally(()=>console.log('Requisição finalizada'))
  })


    $('.calendar-grid').on('change', '.select-hours', function() {
        var Selecthorario = $(this).val();
        var idHorario = $(this).find(':selected').attr('id');
        
        containerConf(Selecthorario, idHorario);

        // Definindo os atributos de dados nos elementos relevantes
        $('.confirmarConsulta').data('Selecthorario', Selecthorario);
        $('.confirmarConsulta').data('idHorario', idHorario);

    });

    $('.planner').on('click', '.containerConf .confirmarConsulta', function() {
        // Acessando os atributos de dados definidos anteriormente
        var Selecthorario = $('.confirmarConsulta').data('Selecthorario');
        var idHorario = $('.confirmarConsulta').data('idHorario');

        console.log('selectHorario: ', Selecthorario);
        console.log('idHorario: ', idHorario);

        var loader = document.querySelector('.loader');
        loader.style.display = 'block';

        var containerCof = document.querySelector('.containerConf');
        containerCof.style.display = 'none';
        
        var objHorario = {
            hora: Selecthorario,
            idHorario: idHorario
        };

        fetch('http://localhost:3600/user/agendamento/agendarConsulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objHorario)
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Resposta do servidor: ', data);

            setTimeout(() => {
                loader.style.display = 'none'
                alert('Agendamento marcado com Sucesso!');
                location.reload();
            }, 3000);   
        })
        .catch(function(error) {
            console.error('Erro ao agendar consulta:', error);
        });
    });


})

