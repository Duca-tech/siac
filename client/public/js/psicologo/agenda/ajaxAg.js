import { exibirAgendas, addAgenda , verificacaoPerfil} from "/js/psicologo/agenda/funcaoAg.js";
$(document).ready(function () {
    // const idPsico = localStorage.getItem('idUser');
    var psico = { idPsico: 0 }
    // Pegar as agendas já criadas:
    $.ajax({
        url: '/psico/agenda/exibirAgenda',
        type: 'POST',
        data: psico
    })
        .done(function (response) {
            console.log('Resposta do servidor: ', response);
            verificacaoPerfil(response.perfil, response.psicologos);
            exibirAgendas(response.agenda);
        })
        .fail(function (errorThrown, status) {
            console.log('Erro na Requisição: ', errorThrown);
            console.log('status da Requisição: ', status);
        })
        .always(function () {
            console.log('Requisição Finalizada!');
        })

    console.log('idPsico: ', idPsico);
    $('#gerarAgenda').on('click', function () {
        var horaIni = $('#horaIni').val();
        var horaFin = $('#horaFin').val();
        var diaSemana = $('#diaSemana').val();
        var data = $('#date').val();

        if (horaIni == '' || horaFin == '' || data == '') {
            alert('Precisa deixar todos os campos completos para gerar a agenda')
        }
        else {
            var agenda = {
                horaIni: horaIni,
                horaFin: horaFin,
                diaSemana: diaSemana,
                data: data,
                idPsico: idPsico
            }
            $.ajax({
                url: '/psico/gerarAgenda',
                type: 'POST',
                data: agenda
            })
                .done(function (response) {
                    console.log('Resposta do servidor: ', response.message, response.agenda, response.horarios);
                    alert('Agenda Criada Com sucesso!');
                    location.reload();
                })
                .fail(function (status, xhr, errorThrown) {
                    console.log('Status: ', status);
                    console.log('Erro: ', errorThrown);
                    console.log(xhr);
                })
                .always(function () {
                    console.log('Requisição finalizada!');
                })
        }
    })

    $('#tabelaAgenda').on('click', '.buttonDelete', function () {
        var idAgenda = $(this).data('id');
        console.log('Id Agenda: ', idAgenda);

        $.ajax({
            url: `/psico/agenda/deletarAgenda/${idAgenda}`,
            type: 'DELETE',
        })
            .done(function (response) {
                console.log('Resposta do Servidor: ', response);
                alert('Agenda Excluida com Sucesso');
                location.reload();
            })
            .fail(function (errorThrown, status) {
                console.log('Falha ao mandar requisição para o servidor!', errorThrown);
                console.log('Status: ', status);
            })
            .always(function () {
                console.log('Requisição finalizada!');
            })
    })

    document.querySelector('.right-section .profile').addEventListener('click', function (){
        window.location.href = '/user/principal/conta'
    })
})