function verificacao(psicologos, agenda, horarios){
    if(!agenda){
        $('#psicoDados').append(`<h3>Sem agenda para consultas!</h3>`);

        
    }
    
}
function selecionarPsico(psicologos){

    var selecao = $(`<select id='listaSelecaoPsico'><option disabled selected>Escolha o Profissional</option></select>`);
    psicologos.map(function(psico){
         var opcao = $(`<option value='${psico.idPsico}'>${psico.nome}</option>`)
         selecao.append(opcao);
    })
    
    $('#psicoDados').append(selecao);
}

function mostrarPsico(psicologos,agenda, horarios){
    $('#psicoDados').on( 'change','#listaSelecaoPsico', function(){
       
        var idPsico = $(this).val();
        $(this).find('option:selected').prop('disabled', true);

        console.log('id do psicologo: ', idPsico);
        console.log('length de psicologos: ', psicologos.length)
        console.log('length de horarios: ', horarios.length)
        console.log('length de agenda: ', agenda.length) 
        

        //percorrer o array com o idPsico
        for(let i =0; i<psicologos.length; i++){
            if(psicologos[i].idPsico == idPsico){
                var nome = psicologos[i].nome;
                var email = psicologos[i].email;
                var endereco = psicologos[i].endereco;
            }
        }
        var nomeDiv = $(`<div style='border-bottom:#D3D3D3; border-top: #D3D3D3;'><span>Agenda: </span> <span>Dr. ${nome}</span></div>`)
        $('#containerAgendaPsico').append(nomeDiv);
         //percorrer o array com o idPsico
         
         var agendaPsico = []
         
        for(let i = 0; i<agenda.length; i++){
            if(agenda[i].idPsico == idPsico){
                agendaPsico.push(agenda[i]);
            }
        }
        console.log('agenda com base no idPsico: ',agendaPsico);

        for(let i=0; i<agendaPsico.length; i++){
            agendaPsico[i].data = formatarData(agendaPsico[i].data);
        }
        
        var horariosPsico = []
        for(let i =0; i<horarios.length; i++){
            horarios[i].hora = formatarHorario(horarios[i].hora)
            for(let j=0; j<agendaPsico.length; j++){
                if(horarios[i].idAgenda == agendaPsico[j].idAgenda){
                    var linha = $(`<tr></tr>`);

                    linha.append(`  
                        <td>${agendaPsico[j].data}</td>
                        <td>${agendaPsico[j].diaSemana}</td>
                        <td><button class='buttonHora btn btn-outline-dark'>${horarios[i].hora}</button></td>
                    `)
                    $('tbody').append(linha);
                }
            }
        }

        $('#containerAgenda').css({'display':'block'});
        console.log('Horarios da Psico: ', horariosPsico);



        
    })

}

   
   
        




//mostrar data

function formatarData(data){
    console.log('data: ', data);
    
    var data = new Date(data);
    var ano = data.getFullYear();
    var mes = data.getMonth() +1;
    var dia = data.getDate();
   
    dia = (dia<10) ? '0' + dia : dia
    mes = (mes<10) ? '0' + mes : mes
    var dataForm = `${dia}/${mes}/${ano}`
    return dataForm;
    
}

function formatarHorario(horario){
    const [hora, minuto] = horario.split(':');
    
    var horasForm = `${hora}:${minuto}`
    
    return horasForm;
}




   
