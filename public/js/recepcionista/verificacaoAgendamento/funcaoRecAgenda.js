var containerConsulta = $(`<div></div>`);

function verificarConsulta(consulta){
    containerConsulta.empty();
    containerConsulta.css({'display':'block'})
    console.log('Consulta: ', consulta);

    if(!consulta){
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
        var dataAtual = new Date(); //método toISOString() para obter a representação da data no formato ISO 8601, que é semelhante ao formato do MySQL
        console.log('Data de Hj: ', dataAtual);
        console.log('Data da Consulta: ', dataConsulta);

        if(dataAtual.getFullYear() === dataConsulta.getFullYear() && dataAtual.getMonth() === dataConsulta.getMonth() && dataAtual.getDay() === dataConsulta.getDay()){
            
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
            // var containerConsulta = $(`<div></div>`)
            var dadosConsulta = $(`<div>
                <p>Paciente: ${consulta.NomePaciente}</p>
                <p>Data: ${consulta.data}</p>
                <p>Dia da Semana: ${consulta.diaSemana}</p>
                <p>Hora: ${consulta.hora}</p>
                <p>Hora: ${consulta.NomePsico}</p>

                <p style='color: red; text-weight: bold'>Sua consulta não esta marcada para hoje</p>
                

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
function putConsulta(){
    
}






    


            


