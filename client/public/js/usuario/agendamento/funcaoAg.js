


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

function generateCalendar(optionValue, agenda, horarios){
  console.log('agenda: ', agenda)
  const calendar = document.getElementById('calendar');
  const currentDate = new Date(0,optionValue);
  const month = currentDate.getMonth();
  console.log('month: ' ,month)
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
      console.log('AgendaMonth', agendaMonth);

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


function selecionarPsico(psicologos){
  console.log('Psicologos: ', psicologos);
    psicologos.map(Element=>{
      var option = document.createElement('option');
      option.value = Element.idPsico
      option.textContent = Element.nome;
      document.getElementById('selecionePsico').append(option);
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


    


   
   



   
