import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'
export function exibirHorarios(horarios){
    var tbody = document.querySelector('#relatorioTable tbody');
    horarios.map((element)=>{
        var tr = document.createElement('tr');
        tr.id = element.idUser
        var tdConsulta = document.createElement('td');
        tdConsulta.append(element.status);
        var tdHora = document.createElement('td');
        element.hora = formatarHorario(element.hora);
        tdHora.append(element.hora)
        var data = document.createElement('td');
        data.classList.add('tdData')
        element.data = formatarData(element.data);
        data.append(element.data);
        tr.append(tdConsulta);
        tr.append(data);
        tr.append(tdHora);
        tbody.append(tr);
    })
}

export function exibirProntuario(data){
    
    var dataAtual = new Date();
    dataAtual = formatarData(dataAtual);
    console.log('Data atual: ', dataAtual);
    data.map(element=>{
        console.log('data data: ', element.data);

        document.querySelectorAll('#relatorioTable tbody tr').forEach((tr) => {
            // Adiciona a cor de fundo para linhas com data atual
            tr.querySelectorAll('td').forEach((td) => {
                if (td.classList.contains("tdData") && td.textContent.trim() == dataAtual.trim()) {
                    tr.style.background = 'green';
                }
            });
        
            // Verifica se o evento de clique já foi adicionado
            if (!tr.dataset.clickAdded) {
                tr.addEventListener('click', function() {
                    console.log('tr id: ', tr.id);
                    let prontuarioEncontrado = false;
        
                    for (let td of tr.querySelectorAll('td')) {
                        if (td.classList.contains("tdData") && td.textContent.trim() == dataAtual.trim()) {
                            console.log('td.textcontent: ', td.textContent.trim());
                            console.log('data atual: ', dataAtual.trim());
                            prontuarioEncontrado = true;
                            prontuarioAtual(td.textContent);
                            fecharProntuarioAtual();
                            break;  // Pare a iteração assim que encontrar a célula correspondente
                        }
                    }
        
                    if (!prontuarioEncontrado) {
                        prontuarioAntigo();
                        fecharProntuarioAntigo();
                    }
                });
                tr.dataset.clickAdded = true; // Marca a linha como evento adicionado
            }
        });
        
    })
    
    
}


function prontuarioAtual(data){
    var p = document.querySelector('.container2 .info-basica .infoData')
;    if(!p.innerHTML.trim() || !p.textContent.trim()){
        console.log('Não tem conteudo')
        p.innerHTML = `<strong>Data: </strong>`;
        p.append(data);
    }
    document.getElementById('prontuarioAtual').style.display = 'block';
    document.getElementById('prontuarioAntigo').style.display = 'none';

    document.getElementById('relatorioTable').style.display = 'none';

}
function prontuarioAntigo(){
    document.getElementById('prontuarioAntigo').style.display = 'block';
    document.getElementById('prontuarioAtual').style.display = 'none';

    document.getElementById('relatorioTable').style.display = 'none';

}
function fecharProntuarioAtual(){
    document.querySelector('.container2 .sectionButton .fechar').addEventListener('click', function(){
        console.log('Evento de click de fechar formulário')
        document.getElementById('prontuarioAtual').style.display = 'none';
        document.getElementById('relatorioTable').style.display = 'block';
    })
}
function fecharProntuarioAntigo(){
    document.querySelector('.container .sectionButton .fechar').addEventListener('click', function(){
        console.log('Evento de click de fechar formulário')
        document.getElementById('prontuarioAntigo').style.display = 'none';
        document.getElementById('relatorioTable').style.display = 'block';
    })
}