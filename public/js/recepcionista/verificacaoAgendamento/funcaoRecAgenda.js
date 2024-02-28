function verificarConsulta(consulta){
    var dataAtual = new Date().toISOString(); //método toISOString() para obter a representação da data no formato ISO 8601, que é semelhante ao formato do MySQL
    console.log('Data de Hj: ', dataAtual);

    if(dataAtual == consulta.data){
        var containerConsulta = $(`<div></div>`)
        var dadosConsulta = $(`<div>
            <p>Paciente: ${consulta.NomePaciente}</p>
            <p>Data: ${consulta.data}</p>
            <p>Dia da Semana: ${consulta.diaSemana}</p>
            <p>Hora: ${consulta.hora}</p>
            <p>Hora: ${consulta.NomePsico}</p>
            
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
            containerConsulta.css({'display':'none'});
            $('#containerVerify').css({'display':'block'});
        })
    }
    else{
        var containerConsulta = $(`<div></div>`)
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
                <button class='btn btn-danger'>Voltar</button>
            </div>
        `)

        
        containerConsulta.append(dadosConsulta);
        containerConsulta.append(dadosVoltar);
        $('#containerVerify').css({'display':'none'})

        $('body').append(containerConsulta);
       
        


        
    }
}

$('#confirmarPresença').on('click', function(){

})

