var chartConsulta;
function exibirConsultas(ctx, data){
    chartConsulta = new Chart(ctx, {
        type: 'bar',
        data: data.dataDispZero,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}
var charUser
function exibirUsuarios(users,data){
    charUser = new Chart(users, {
        type: 'doughnut',
        data: data.perfilUser,
        options: {
            responsive: true,

        }
    });
}

function selecionarConsulta(data){
    var selectConsult = document.getElementById('selectConsulta');
    selectConsult.addEventListener('change', function(){
        console.log('select escolhido: ', selectConsult.value);
        if(selectConsult.value == 1){
            chartConsulta.data =  data.dataDispUm
        }
        if(selectConsult.value == 0){
            chartConsulta.data = data.dataDispZero
        }
        
        // Atualiza o gráfico após mudar os dados
        chartConsulta.update();

    })
}

function exibirAgendas(ag, data){
    charUser = new Chart(ag, {
        type: 'bar',
        data: data.dataAg,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}