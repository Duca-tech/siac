$(document).ready(function(){})
function selecionarPsico(psicologos){

    var selecao = $(`<select id='listaSelecaoPsico'><option disabled selected>Escolha o Profissional</option></select>`);
    psicologos.map(function(psico){
         var opcao = $(`<option value='${psico.idPsico}'>${psico.nome}</option>`)
         selecao.append(opcao);
    })
    
    $('#psicoDados').append(selecao);
}
var idAgenda;
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
         //percorrer o array com o idPsico
         for(let i =0; i<agenda.length; i++){
            if(agenda[i].idPsico == idPsico){
                var data = agenda[i].data;
                var diaSemana = agenda[i].diaSemana;
                idAgenda = agenda[i].idAgenda;
                
            }
        }
        console.log(idPsico, nome, email, endereco);
        console.log(data, diaSemana, idAgenda);

        data = formatarData(data);

        console.log('id Agenda: ', idAgenda);
        
        console.log(horarios.length);
        var arrayHoras = [];
        for(let i=0; i<horarios.length>0; i++){
            if(idAgenda === horarios[i].idAgenda){
                console.log('horarios no loop: ', horarios[i]);
                idAgenda = horarios[i].idAgenda;
                if(horarios[i].disponibilidade == 0){
                    horarios[i].hora = formatarHorario(horarios[i].hora)
                    arrayHoras.push(horarios[i].hora);  
                } 
            }
            
        }
        var divHora = $(`<div class='col'></div>`)
        if(arrayHoras.length>0){
            arrayHoras.forEach(function(hora){
                var buttonHora = $(`<button class='m-2  btn buttonHora '>${hora}</button>`)
                divHora.append(buttonHora);
            })
        }
        else{
            divHora.append(`<p style='font-weight: bold;'>Sem Horarios Disponíveis`);
        }   

    
    var containerAgenda = $(`<div style='margin-botttom: 20px; margin-top: 20px'></div>`);
    containerAgenda.empty();
    
   containerAgenda.append(`<div class='borda-inferior' ><span style='font-weight: bold; margin-top: 20px; margin-bottom: 20px;'>Agenda: </span>Dr. ${nome}</div>`)
        

        var cabecalho = $(`
        <div class="d-flex row borda-inferior" style='margin-top: 20px;'>
            <div class="col">Data</div>
            <div class="col">Dia da Semana</div>
            <div class="col">Horarios Disponiveis</div>
        </div>
        `)
        containerAgenda.append(cabecalho);
        var divAgenda = $(`<div id='divAgenda' class='d-flex row align-items-center'></div>`)
        var divData = $(`<div class='col'> ${data}</div>`);
        var divDiaSemana = $(`<div class='col'> ${diaSemana}</div>`)
        divAgenda.append(divData);
        divAgenda.append(divDiaSemana);
        divAgenda.append(divHora);

        containerAgenda.append(divAgenda);
        $('#psicoDados').append(containerAgenda);
        
        
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




   
