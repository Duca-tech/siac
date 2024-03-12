var containerConsulta = $(`<div class='borda'></div>`);

function verificarConsulta(consulta){
    containerConsulta.empty();
    containerConsulta.css({'display':'block', 'text-align':'center', 'position':'absolute', 'top':'40%', 'left':'40%'})
    console.log('Consulta: ', consulta);

    if(!consulta){
        containerConsulta.css({'opacity':'1'});
        var resposta = $(`<p>Você Não tem nenhuma Consulta Agendada<p>`)
        resposta.css({'color': 'red','font-weigth':'bold'})
        containerConsulta.append(resposta)
        
        $('#containerVerify').css({'display':'none'})
        $('body').append(containerConsulta);
        containerConsulta.animate({
            'heigth': 'toggle',
            'opacity':'0'
        }, 3500, function(){
            $('#containerVerify').css({
                'display': 'block'
            })
        })
    }
    else{
        var dataConsulta = new Date(consulta.data);
        var dataAtual = new Date(); // Método toISOString() para obter a representação da data no formato ISO 8601, que é semelhante ao formato do MySQL.
        console.log('Data de Hj: ', dataAtual);
        console.log('Data da Consulta: ', dataConsulta);

        if(dataAtual.getFullYear() === dataConsulta.getFullYear() && dataAtual.getMonth() === dataConsulta.getMonth() && dataAtual.getDay() === dataConsulta.getDay() && consulta.status == 'pendente'){
            
            // var containerConsulta = $(`<div></div>`)
            var dadosConsulta = $(`<div>
                <p>Paciente: ${consulta.NomePaciente}</p>
                <p>Data: ${consulta.data}</p>
                <p>Dia da Semana: ${consulta.diaSemana}</p>
                <p>Hora: ${consulta.hora}</p>
                <p>Doutor(a): ${consulta.NomePsico}</p>
                
            </div>`)
            var buttonConsulta = $(`
                <button class='btn btn-outline-success' id='confirmarPresença'>Confirmar Presença</button>
                <button class='btn btn-outline-warning' id='cancelarPresenca'>Cancelar</button>
            `)

            containerConsulta.append(dadosConsulta)    
            containerConsulta.append(buttonConsulta);

            $('#containerVerify').css({'display':'none'})

            $('body').append(containerConsulta);

            $('#cancelarPresenca').on('click', function(){
                containerConsulta.css({'display':'none'})
                $('#containerVerify').css({'display':'block'})
            })
          
        }
        else{
            if(consulta.status =='present'){
                var dadosConsulta = $(`<div>
                    <p>Paciente: ${consulta.NomePaciente}</p>
                    <p>Data: ${consulta.data}</p>
                    <p>Dia da Semana: ${consulta.diaSemana}</p>
                    <p>Hora: ${consulta.hora}</p>
                    <p>Psicologo: ${consulta.NomePsico}</p>
                    <p>Status: ${consulta.status}</p>

                    <p style='color: red; text-weight: bold'>Você ja deu preseça na consulta</p>
                    

                </div>`)

                var dadosVoltar = $(`
                    <div>
                        <button id='voltar' class='btn btn-danger'>Voltar</button>
                    </div>
                `)

                
                containerConsulta.append(dadosConsulta);
                containerConsulta.append(dadosVoltar);
                $('#containerVerify').css({'display':'none'})

                $('body').append(containerConsulta);

                $('#voltar').on('click', function(){
                    containerConsulta.css({'display':'none'});
                    $('#containerVerify').css({'display':'block'})
                    
                })
            }
            else{
                var dadosConsulta = $(`<div>
                    <p>Paciente: ${consulta.NomePaciente}</p>
                    <p>Data: ${consulta.data}</p>
                    <p>Dia da Semana: ${consulta.diaSemana}</p>
                    <p>Hora: ${consulta.hora}</p>
                    <p>Psicologo: ${consulta.NomePsico}</p>
                    <p>Status: ${consulta.status}</p>

                    <p style='color: red; text-weight: bold'>Você ja deu preseça na consulta</p>
                    

                </div>`)

                var dadosVoltar = $(`
                    <div>
                        <button id='voltar' class='btn btn-danger'>Voltar</button>
                    </div>
                `)

                
                containerConsulta.append(dadosConsulta);
                containerConsulta.append(dadosVoltar);
                $('#containerVerify').css({'display':'none'})

                $('body').append(containerConsulta);

                $('#voltar').on('click', function(){
                    containerConsulta.css({'display':'none'});
                    $('#containerVerify').css({'display':'block'})
                    
                })
            }    
        }
        
    }
    
}
function putConsulta(dados){

    console.log('Dados da função: ', dados);
    var table = $(`<table></table>`);
    var cabecalho = $(`
        <thead>
            <tr class='cabecalho'>
                <th>Paciente</th>
                <th>Dia da Semana</th>
                <th>Data</th>
                <th>Horario</th>
                <th>Profissional Psicólogo</th>
                <th>Status</th>
            </tr>
        </thead>
    `)
    table.append(cabecalho);

    var body = $(`<tbody></tbody>`);
    
    
        var linha = $(`<tr></tr>`)
        var conteudo = $(`
            <td>${dados.NomePaciente}</td>
            <td>${dados.diaSemana}</td>
            <td>${dados.data}</td>
            <td>${dados.hora}</td>
            <td>${dados.NomePsico}</td>
            <td>${dados.status}</td>
        `)
        linha.append(conteudo);
        body.append(linha);

    table.append(body);

    $('#containerVerify').css({'display':'block'});
    $('body').append(table);
    containerConsulta.css({'display':'none'})
    
}






    


            


