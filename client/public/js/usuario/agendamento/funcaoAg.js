


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
function gerarDiaSemanaData(){
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
  

}



function search(agenda, horarios, psicologos){
  gerarDiaSemanaData();

  console.log('Agenda: ', agenda);
  console.log('horarios:', horarios)
  console.log('Psicos: ', psicologos)

  var search = document.querySelector('.search');
  search.addEventListener('click', function(){

    var data = document.querySelector('.data').value;
    var diaSemana = document.querySelector('.diaSemana').value
    var hora = document.querySelector('.hora').value
    var psico = document.getElementById('selecionePsico').value

    console.log('data: ', data);
    console.log('diaSemana: ', diaSemana);
    console.log('hora: ', hora);
    console.log('psico: ',psico);

    var dados = {
      data: data,
      diaSemana: diaSemana,
      hora: hora,
      psico: psico
    }

    var post = {
      method: 'POST',
      headers:{
        'Content-Type': 'Application/json' //Dados enviados são json
      },
      body: JSON.stringify(dados)
    }

    fetch('http://localhost:3600/user/principal/agendamento/buscar', post)
    .then(response=> response.json())
    .then(data => {
      console.log('Dados recebidos: ', data)
    })
    .catch(error=>{
      console.error('Erro: ', error)
    })
    .finally(()=>console.log('Requisição finalizada'))
  })

}

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
    


   
   



   
