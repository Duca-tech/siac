


 function verificacao(psicologos, agenda, horarios){
    if(!agenda){
        $('#psicoDados').append(`<h3>Sem agenda para consultas!</h3>`);
    }
}



function firstGenerateCalendar(agenda, horarios){
  console.log('agenda: ', agenda)
  const calendar = document.getElementById('calendar');
  const currentDate = new Date();
  const month = currentDate.getMonth();
  console.log('month: ' ,month)
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
      // console.log('AgendaDate: ', agendaDate);
      // console.log('AgendaDay: ', agendaDay);

      if(agendaDay == day && agendaMonth == month){
        
      //lista de seleção de horários
        var selectHours = document.createElement('select')
        selectHours.className = 'select-hours'
        var option = document.createElement('option');
        option.textContent = 'Horários Disponíveis'
        // Defina os atributos disabled e selected para desabilitar e selecionar a opção inicial
        option.disabled = true;
        option.selected = true;
        selectHours.appendChild(option);
             
        for(let x = 0; x<horarios.length; x++){
          if(horarios[x].idAgenda == agenda[j].idAgenda){
            var buttonOption = document.createElement('option');
            buttonOption.className = 'option-hours'
            buttonOption.textContent = horarios[x].hora;
            selectHours.append(buttonOption);
            daySquares.append(selectHours); 
          
          }
        }
      }
    }
  
    calendar.appendChild(daySquares);
  }

}
//Geração de Calendário com base na escolha do Mês 
function generateCalendar(optionValue, agenda, horarios){
  
  document.getElementById('calendar').innerHTML = '';
  console.log('agenda: ', agenda)
  const calendar = document.getElementById('calendar');
  const currentDate = new Date(0,optionValue);
  const month = currentDate.getMonth();
  console.log('month: ' ,month)
  console.log('optionValue: ' ,optionValue)
  var selectMonth = document.querySelector('.selectMonth');
  selectMonth.value = month;
  const year = currentDate.getFullYear();

  var agendaData = eliminarElementosDuplicados(agenda.data);

  console.log('AgendaData: ', agendaData)

  const firstDayOfMonth = new Date(year, month, 1);
  console.log('firstDayOfMonth: ', firstDayOfMonth);

  const lastDayfMonth = new Date(year, month+1, 0);
  console.log('lastDayfMonth: ', lastDayfMonth);
  
  //Primeiro dia Da Semana
  const firstDayOfWeek = firstDayOfMonth.getDay();
  console.log('firstDayOfWeek: ', firstDayOfWeek);
  const totalDays = lastDayfMonth.getDate();
  console.log('totalDays: ', totalDays);  

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
      console.log('AgendaDate: ', agendaDate);
      console.log('AgendaDay: ', agendaDay);
      console.log('AgendaMonth: ', agendaMonth);

      if(agendaDay == day && agendaMonth == month){
        
      //lista de seleção de horários
        var selectHours = document.createElement('select')
        selectHours.className = 'select-hours'
        var option = document.createElement('option');
        option.textContent = 'Horários Disponíveis'
        // Defina os atributos disabled e selected para desabilitar e selecionar a opção inicial
        option.disabled = true;
        option.selected = true;
        selectHours.appendChild(option);
             
        for(let x = 0; x<horarios.length; x++){
          if(horarios[x].idAgenda == agenda[j].idAgenda){
            var buttonOption = document.createElement('option');
            buttonOption.className = 'option-hours'
            buttonOption.textContent = horarios[x].hora;
            selectHours.append(buttonOption);
            daySquares.append(selectHours); 
          
          }
        }
      }
    }
  
    calendar.appendChild(daySquares);
  }

}

function searchCalendar(dados) {
  var diaSemana = [];
  var hora = [];
  var data = [];
  var nomePsico = [];

  dados.forEach(element => {
    diaSemana.push(element.diaSemana);
    hora.push(element.hora);
    data.push(element.data);
    nomePsico.push(element.nome);
  });

  diaSemana = eliminarElementosDuplicados(diaSemana)
  hora = eliminarElementosDuplicados(hora)
  data = eliminarElementosDuplicados(data)
  nomePsico = eliminarElementosDuplicados(nomePsico)



  console.log('Dia da Semana: ', diaSemana);
  console.log('hora: ', hora);
  console.log('data: ', data);
  console.log('nome do psicólogo: ', nomePsico);

  var mes = []
  data.forEach(element=>{
    var date = new Date(element);
    mes.push(date.getMonth());
  })
  console.log('mês: ', mes);

  desabilitarMesesSearch(mes);

  generateCalendar(mes[0], dados, dados);
}


function selecionarPsico(psicologos){
  console.log('Psicologos: ', psicologos);
    psicologos.map(Element=>{
      var option = document.createElement('option');
      option.value = Element.idUser
      option.textContent = Element.nome;
      document.getElementById('selecionePsico').appendChild(option);
    })
}

 function SelectMonthGenerateCalendar(agenda, horarios){

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
  $('select.diaSemana').css({
    'display':'block'
  })
  $(this).css({
    'display':'none'
  })
  $('.data').val('dd/mm/aaaa');
})

function eliminarElementosDuplicados(array){

  var conjunto = new Set(array);

  const arraySemDuplicidade = [...conjunto]
  return arraySemDuplicidade;

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

    


   
   



   
