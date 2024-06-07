import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'
$('#date').change(function () {
    var dataAtual = new Date(); //Data atual.
    var data = $(this).val() + 'T23:59:59';
    console.log('Data: ', data)
    var diaSemana = new Date(data);
    console.log('data atual: ', dataAtual);
    console.log('diaSemana: ', diaSemana);
    var diaSemanaFormatado = diaSemana.toLocaleDateString('pt-BR', { weekday: 'long' })
    console.log('Dia da semana: ', diaSemanaFormatado);
    
    if (diaSemana < dataAtual) {
        $('#diaSemana').val('');
        $('#date').val('DD/MM/AAAA');
        $('#containerDiaSemana').css({
            'display': 'none'
        })
        alert('Não pode Inserir uma data anterior a data de hoje');
x
    }
    else {
        $('#diaSemana').val(diaSemanaFormatado);
        $('#containerDiaSemana').css({
            'display': 'block'
        })
    }
})

export function exibirAgendas(agenda) {
    console.log('Agenda: ', agenda)
    var cabecalho = $(`
            <thead  id="cabecalhoAgenda">
                <tr>
                    <th>Psicólogo</th>
                    <th>Data</th>
                    <th>Dia da semana</th>
                    <th>Hora Inicial</th>
                    <th>Hora Final</th>
                </tr>
            </thead>
        `)
    $('#tabelaAgenda').append(cabecalho)

    var body = $(`<tbody></tbody>`)

    for (let i = 0; i < agenda.length; i++) {
        agenda[i].data = formatarData(agenda[i].data);
        agenda[i].horaFin = formatarHorario(agenda[i].horaFin);
        agenda[i].horaIni = formatarHorario(agenda[i].horaIni);
        var linha = $(`<tr></tr>`)
        var nomePsico = $(`<td>${agenda[i].nome}</td>`)
        var data = $(`<td >${agenda[i].data}</td>`)
        var diaSemana = $(`<td >${agenda[i].diaSemana}</td>`)
        var horaIni = $(`<td >${agenda[i].horaIni}</td>`)
        var horaFin = $(`<td >${agenda[i].horaFin}</td>`)
        var delecao = $(`<td><button class='btn btn-danger buttonDelete' data-id='${agenda[i].idAgenda}'>Deletar Agenda</button></td>`);

        linha.append(nomePsico);
        linha.append(data)
        linha.append(diaSemana)
        linha.append(horaIni)
        linha.append(horaFin)
        linha.append(delecao)

        body.append(linha);
    }

    $('#tabelaAgenda').append(body);

    $('#ContainerAgendaDados').animate({
        'heigth': 'toggle',
        'opacity': '1'
    }, 1000, function () {
        $('#ContainerAgendaDados').css({ 'display': 'block' });
    })
}

export function addAgenda(agenda) {
    console.log('dia da semana: ', agenda.diaSemana)
    console.log('Data: ', agenda.data)
    console.log('Hora Inicial: ', agenda.horaIni);
    console.log('Hora Final: ', agenda.horaFin);

    $('#date').val('dd-mm-aaaa');
    $('#containerDiaSemana').css({ 'display': 'none' })
    $('#horaIni').val('');
    $('#horaFin').val('');
}

// function formatarData(data) {
//     console.log('data: ', data);

//     var data = new Date(data);
//     var ano = data.getFullYear();
//     var mes = data.getMonth() + 1;
//     var dia = data.getDate();

//     dia = (dia < 10) ? '0' + dia : dia
//     mes = (mes < 10) ? '0' + mes : mes
//     var dataForm = `${dia}/${mes}/${ano}`
   
//     return dataForm;
// }

// function formatarHorario(horario) {
//     const [hora, minuto] = horario.split(':');

//     var horasForm = `${hora}:${minuto}`

//     return horasForm;
// }


