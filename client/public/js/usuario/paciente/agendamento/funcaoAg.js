

import {convertDateFormat, formatarData} from '/js/formatacao/funcao.js'

 export function verificacao(agenda){
    if(!agenda){
        $('#psicoDados').append(`<h3>Sem agenda para consultas!</h3>`);
    }
  }




function generateCalendar(optionValue, agenda, horarios){

  var datahoje = new Date();
  datahoje = convertDateFormat(datahoje);
  console.log('data de hoje: ', datahoje);
  
  
  document.getElementById('calendar').innerHTML = '';
  console.log('agenda: ', agenda)
  const calendar = document.getElementById('calendar');
  const currentDate = new Date(0,optionValue);
  const month = currentDate.getMonth();
  console.log('month: ',month)
  console.log('optionValue: ' ,optionValue)
  var selectMonth = document.querySelector('.selectMonth');
  selectMonth.value = month;
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  console.log('firstDayOfMonth: ', firstDayOfMonth);

  const lastDayfMonth = new Date(year, month+1, 0);
  console.log('lastDayfMonth: ', lastDayfMonth);
  
  //Primeiro dia Da Semana
  const firstDayOfWeek = firstDayOfMonth.getDay();
  console.log('firstDayOfWeek: ', firstDayOfWeek);
  const totalDays = lastDayfMonth.getDate();
  console.log('totalDays: ', totalDays);  

  cabecalhoCalendar(); // gerará o cabeçalho dos dias da Semana

  for(let i = 0; i< firstDayOfWeek; i++){
    let blankDay = document.createElement('div');
    // blankDay.classList.add('borda');
    
    calendar.appendChild(blankDay);
  }
  for(let day =1; day<= totalDays; day++){
    let daySquares = document.createElement('div')
    daySquares.className = 'calendar-day';
    // daySquares.classList.add('borda');
    daySquares.textContent = day;
    daySquares.id = `day-${day}`
    
    for(let j = 0; j<agenda.length; j++ ){
      var agendaDate = new Date(agenda[j].data);
      var agendaDay = agendaDate.getDate();
      var agendaMonth = agendaDate.getMonth();
      agendaDate = convertDateFormat(agendaDate);
      console.log('agendaDate: ', agendaDate);

      

      if(agendaDay == day && agendaMonth == month && agendaDate >= datahoje){
        console.log('agendaMonth: ', agendaMonth);
      //lista de seleção de horários
        var selectHours = document.createElement('select')
        selectHours.className = 'select-hours'
        var option = document.createElement('option');
        
        option.textContent = 'Horários'
        
        // Defina os atributos disabled e selected para desabilitar e selecionar a opção inicial
        option.disabled = true;
        option.selected = true;
        selectHours.appendChild(option);
             
        for(let x = 0; x<horarios.length; x++){
          if(horarios[x].idAgenda == agenda[j].idAgenda){
            console.log('agenda[j].idAgenda: ', agenda[j].idAgenda)
            console.log('horarios[x].idAgenda ', horarios[x].idAgenda)
            var buttonOption = document.createElement('option');
            buttonOption.className = 'option-hours'
            buttonOption.textContent = horarios[x].hora;
            buttonOption.id = horarios[x].idHorario;
            selectHours.append(buttonOption);
            daySquares.append(selectHours); 
          
          }
        }
      }
    }
  
    calendar.appendChild(daySquares);
  }

}

export function searchCalendar(agenda, horarios) {

  var mes = []
  agenda.forEach(element=>{
    var date = new Date(element.data);
    mes.push(date.getMonth());
  })
  console.log('mês: ', mes);

  desabilitarMesesSearch(mes);

  generateCalendar(mes[0], agenda, horarios);
}


export function selecionarPsico(psicologos){
    psicologos.map(Element=>{
      var option = document.createElement('option');
      option.value = Element.idUser
      option.textContent = Element.nome;
      document.getElementById('selecionePsico').appendChild(option);
    })
}

 export function SelectMonthGenerateCalendar(agenda, horarios){

  document.querySelector('.selectMonth').addEventListener('change', function(){
    document.getElementById('calendar').innerHTML = '';
    var ValorOption = this.value;
    console.log('ValorOption: ', ValorOption);
    generateCalendar(ValorOption, agenda, horarios);
  })
}
document.querySelector('.data').addEventListener('change',function () {
    var dataAtual = new Date(); //Data atual.
    var data = $(this).val();
    console.log('data: ', data); //dd/mm/aaaa
    var parteData = data.split('-');
    var ano = parteData[0];
    var mes = parteData[1];
    var dia = parteData[2];
    var diaSemana = new Date(ano,mes-1,dia);
    console.log('diaSemana: ', diaSemana)
    var diaSemanaFormatado = diaSemana.toLocaleDateString('pt-BR', { weekday: 'long' })
    console.log('Dia da semana: ', diaSemanaFormatado);
    
    if (diaSemana < dataAtual) {
        $('#diaSemana').val('');
        $('#date').val('DD/MM/AAAA');
        $('#containerDiaSemana').css({
            'display': 'none'
        })
        alert('Não pode Inserir uma data anterior a data de hoje');

    }
    else {
        document.querySelector('.diaSemana').value = diaSemanaFormatado;
        $('select.diaSemana').css({
            'display': 'none'
        })
        $('.selectDiaSemana').css({
          'display':'none'
        })
        $('input.diaSemana').css({
          'display':'block'
        })
        $('.buttonDiaSemana').css({
          'display':'block'
        })
    }
})
  

$('.buttonDiaSemana').on('click', function(){
  console.log($(this).val());
  $('input.diaSemana').css({
    'display':'none'
  })
  $('.selectDiaSemana').css({
    'display':'block'
  })
  $('select.diaSemana').css({
    'display':'block'
  })
  $(this).css({
    'display':'none'
  })
  $('.data').val('dd/mm/aaaa');
})

function eliminarElementosDuplicados(array){
  console.log('Array com elementos duplicados: ', array);
  var agenda = []
  var horarios = []
  var psicos = []
  var agendaSemDupId = new Set();
  var psicoSemDupId = new Set();

  array.map(element=>{
    if(!agendaSemDupId.has(element.idAgenda)){
      agendaSemDupId.add(element.idAgenda);
      agenda.push({
        data: element.data,
        diaSemana: element.diaSemana,
        horaIni: element.horaIni,
        horaFin: element.horaFin,
        idAgenda: element.idAgenda
      })
    }
    horarios.push({
      idHorario: element.idHorario,
      hora: element.hora,
      idAgenda: element.idAgenda,
      disponibilidade: element.disponibilidade
    })

    if(!psicoSemDupId.has(element.idUser)){
      psicoSemDupId.add(element.idUser);
      psicos.push({
        nome: element.nome,
        idUser: element.idUser
      })
    }
  })

  console.log('psicos: ', psicos);
  console.log('Agenda: ', agenda);
  console.log('Horarios: ',horarios)
  
  //  console.log('psicos: ', psicos);
   console.log('AgendaSemDup: ', agenda);
  //  console.log('Horarios: ',horarios)
  

  return [agenda, horarios, psicos];

}

function desabilitarMesesSearch(mes) {
  

  var selectMonth = document.querySelector('.selectMonth');

  var options = selectMonth.options;
  for (let i = 0; i < options.length; i++) {
    options[i].disabled = true;

    var optionValue = parseInt(options[i].value);
    for (let j = 0; j < mes.length; j++) {
      // Verifique se o valor do mês é igual ao valor da opção
      
      if (optionValue == mes[j]) {
        // Se for igual, desabilite a opção
        console.log('option value: ', optionValue)
        console.log('mes: ', mes[j])
        options[i].disabled = false
        // Saia do loop interno, pois já encontramos uma correspondência
      }
     
        
    }
  }
}

export function verificacaoHorario(data){
  if (data.length == 0){
    alert('nenhuma Consulta Encontrada');
    location.reload();
  }
  else{
    var [agenda, horarios, psicos] = eliminarElementosDuplicados(data)
    searchCalendar(agenda, horarios, psicos);
  }
}


export function containerConf(){

  document.querySelector('.modal').style.display = 'block';

  document.getElementById('cancelButton').addEventListener('click', function(){
    
    document.querySelector('.modal').style.display = 'none';
  })
  document.querySelector('.modal .modal-content .close').addEventListener('click', function(){
    document.querySelector('.modal').style.display = 'none';

  })

}
function cabecalhoCalendar(){
  const diasDaSemana = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'];
  const calendarGrid = document.querySelector('.calendar-grid');

  for (let i = 0; i < diasDaSemana.length; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.background = '#696969';
    box.textContent = diasDaSemana[i];
    calendarGrid.appendChild(box);
  }
}

    


   
   



   
