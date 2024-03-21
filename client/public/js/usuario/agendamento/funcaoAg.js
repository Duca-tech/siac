


 function verificacao(psicologos, agenda, horarios){
    if(!agenda){
        $('#psicoDados').append(`<h3>Sem agenda para consultas!</h3>`);
    }
}

window.onload = function(){
  generateCalendar();
}

function generateCalendar(){
  const calendar = document.getElementById('calendar');
  const currentDate = new Date();
  const month = currentDate.getMonth();
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
    blankDay.classList.add('borda');
    calendar.appendChild(blankDay);
  }

  for(let day =0; day<= totalDays; day++){
    let daySquares = document.createElement('div')
    daySquares.className = 'calendar-day';
    daySquares.classList.add('borda');
    daySquares.textContent = day;
    daySquares.id = `day-${day}`
    calendar.appendChild(daySquares);
  }

}

function showAddTaskModal(){
  document.getElementById('addTaskModal').style.display ='block'
  document.getElementById('addTaskModal').classList.add('borda');
}

function closeAddTaskModal(){
  document.getElementById('addTaskModal').style.display ='none'
}

function deleteTask(taskElement){
  if(confirm("Are you sure you Want to delete this task?")){
    taskElement.parentNode.removeChild(taskElement)
  }
}

function editTask(taskElement){
  const newTaskDesc = prompt('Edit Your task: ', taskElement.textContent)
  
  if(newTaskDesc !== null && newTaskDesc.trim() !== ''){
    taskElement.textContent = newTaskDesc
  }
}

function addTask(){
  const taskDate = new Date(document.getElementById('task-date').value)
  const taskDesc = document.getElementById('task-desc').value.trim(); 
  
  if(taskDesc && !isNaN(taskDate.getDate())){
    const calendarDays = document.getElementById('calendar').children;
    for(let i=0; i<calendarDays.length; i++){
      const day = calendarDays[i];
      if(parseInt(day.textContent) === taskDate.getDate()){
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.textContent = taskDesc;

        //contextmenu é evento de click com o lado direito do mouse
        taskElement.addEventListener('contextmenu', function(event){
          event.preventDefault();
          deleteTask(taskElement);

        })

        taskElement.addEventListener('click', function(){
          editTask(taskElement);
        })
        day.appendChild(taskElement);
        break;
      }
    }    
    closeAddTaskModal();
  }
  else{
    alert('Please, enter a valid date and task description!');
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
    


   
   



   
