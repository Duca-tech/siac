
    
    $('#date').change(function(){
        var dataAtual = new Date(); //data atual
        var data = $(this).val();

        var diaSemana = new Date(data);

       var diaSemanaFormatado = diaSemana.toLocaleDateString('pt-BR', {weekday: 'long'})
       console.log('Dia da semana: ', diaSemanaFormatado);
        if(diaSemana<dataAtual){
            $('#diaSemana').val('');
            $('#date').val('DD/MM/AAAA');
            $('#containerDiaSemana').css({
                'display':'none'
            })
            alert('Não pode Inserir uma data anterior a data de hoje');
           
        }   
        else{
            $('#diaSemana').val(diaSemanaFormatado);
            $('#containerDiaSemana').css({
                'display':'block'
            })
        }
    })

    function exibirAgendas(agenda){
        var cabecalho =$(`
            <thead  id="cabecalhoAgenda">
                <tr>
                    <th >Data</th>
                    <th >Dia da semana</th>
                    <th >Hora Inicial</th>
                    <th >Hora Final</th>
                </tr>
            </thead>
        `)
        $('#tabelaAgenda').append(cabecalho)

        var body = $(`<tbody></tbody>`)


        for(let i=0; i<agenda.length; i++){
            var linha = $(`<tr></tr>`)
            var data = $(`<td >${agenda[i].data}</td>`)
            var diaSemana = $(`<td >${agenda[i].diaSemana}</td>`)
            var horaIni = $(`<td >${agenda[i].horaIni}</td>`)
            var horaFin = $(`<td >${agenda[i].horaFin}</td>`)
            var delecao = $(`<td><button class='btn btn-danger buttonDelete' data-id='${agenda[i].idAgenda}'>Deletar Agenda</button></td>`);

            linha.append(data)
            linha.append(diaSemana)
            linha.append(horaIni)
            linha.append(horaFin)
            linha.append(delecao)

            body.append(linha);

        }
        $('#tabelaAgenda').append(body);

        $('#ContainerAgendaDados').animate({
            'heigth':'toggle',
            'opacity':'1'
        }, 1000, function(){
            $('#ContainerAgendaDados').css({'display':'block'});
        })

    }

    function addAgenda(agenda){
        console.log('dia da semana: ', agenda.diaSemana)
        console.log('Data: ', agenda.data)
        console.log('Hora Inicial: ', agenda.horaIni);
        console.log('Hora Final: ', agenda.horaFin);
        
        

        $('#date').val('dd-mm-aaaa');
        $('#containerDiaSemana').css({'display':'none'})
        $('#horaIni').val('');
        $('#horaFin').val('');
        
    }


   
