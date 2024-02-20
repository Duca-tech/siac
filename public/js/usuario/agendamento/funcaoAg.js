function mostrarPsico(psicologos){
    
    $.each(psicologos, (index, psicologo)=>{
        var nome = $('<h4></h4>').html(`Dr. ${psicologo.nome}`)
        var endereco = $('<p></p>').html(`${psicologo.endereco}`)
        $('#psicoDados').append(nome)
        $('#psicoDados').append(endereco)
        
    })

}

function psicoAgenda(psicologos){
    console.log('psicologos', psicologos)
    var p = $('<div></div>').html(`<span style = 'font-weight: bold;'>Agenda: </span>  <span>Dr.${psicologos[0].nome}</span>`);

    $('#agendaPsico').append(p);
    

}

//mostrar data

function mostrarData(agenda){
    console.log('data: ', agenda.data);
    
    var data = new Date(agenda.data);
    var ano = data.getFullYear();
    var mes = data.getMonth() +1;
    var dia = data.getDate();
   
    dia = (dia<10) ? '0' + dia : dia
    mes = (mes<10) ? '0' + mes : mes
   
    $('#dataHorario').html(`<p>${dia}/${mes}/${ano}</p>`);
}

function mostrarDiaSemana(agenda){
    var diaSemana = agenda.diaSemana;
    console.log(diaSemana);

    $('#diaSemana').append(`${diaSemana}`);
}
//função para criar os buttons de horario da tabela  das tabelas
function intervaloHorarios(agenda){
   var [horaIni,minIni] = agenda.horaIni.split(':');
   var horaInicial = new Date();
   horaInicial.setHours(horaIni, minIni,0,0);
   console.log(horaInicial);
   

   var [horaFin, minFin] = agenda.horaFin.split(':');
   var horaFinal = new Date();
   horaFinal.setHours(horaFin, minFin, 0,0);
   console.log(horaFinal)
   

   var horaAtual = new Date(horaInicial);

   while(horaAtual<=horaFinal){
    horaAtualFormatada = horaAtual.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    
    var containerHora = $(`<div id='containerHora'><button style='margin:5px;'>${horaAtualFormatada}</button></div>`);
    
    $('#horarios').append(containerHora);

    horaAtual.setMinutes(horaAtual.getMinutes() + 30);

   }

   //função para formatar TIME
   function formatarTime(button){
    console.log(button);
    
   }



   
}