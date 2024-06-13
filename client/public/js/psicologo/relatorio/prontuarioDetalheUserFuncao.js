import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'
window.idHorarioGlobal = null;
window.idPacGlobal = null;

export function exibirHorarios(horarios){
    var tbody = document.querySelector('#relatorioTable tbody');
    horarios.map((element)=>{
        var tr = document.createElement('tr');
        tr.id = element.idUser
        tr.setAttribute('idHorario', element.idHorario)
        var tdConsulta = document.createElement('td');
        tdConsulta.append(element.status);
        tdConsulta.setAttribute('class', 'status');
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
var dataAtual = new Date();
dataAtual = formatarData(dataAtual);
export function exibirProntuario(data){
    
    
    console.log('Data atual: ', dataAtual);
    data.map(element=>{
        console.log('data data: ', element.data);

        document.querySelectorAll('#relatorioTable tbody tr').forEach((tr) => {
            // Adiciona a cor de fundo para linhas com data atual
            let isDataAtual = false;
            let isStatusAgendado = false;

            tr.querySelectorAll('td').forEach((td) => {
                if (td.classList.contains("tdData") && td.textContent.trim() == dataAtual.trim()) {
                    isDataAtual = true;
                }
                if (td.classList.contains("status") && td.textContent.trim() == 'agendado') {
                    isStatusAgendado = true;
                }
            });
            console.log(isDataAtual, isStatusAgendado)
            if(isDataAtual && isStatusAgendado){
                tr.style.background = '#90EE90';
            }
        
            // Verifica se o evento de clique já foi adicionado
            if (!tr.dataset.clickAdded) {
                tr.addEventListener('click', function() {
                    const idHorario = this.getAttribute('idhorario');
                    const idPac = this.getAttribute('id');
                    
                    window.idHorarioGlobal = idHorario;
                    window.idPacGlobal = idPac;
                    
                    let prontuarioEncontrado = false;
                    const status = this.querySelector('.status').textContent.trim();
                    const dataConsulta = this.querySelector('.tdData').textContent.trim();
                    console.log(status);
                    console.log(dataConsulta);
                    
                    
                    if(status == 'agendado' && dataConsulta == dataAtual.trim() ){
                                
                            prontuarioEncontrado = true;
                            prontuarioAtual(dataConsulta, data);
                            fecharProntuarioAtual();
                                  // Pare a iteração assim que encontrar a célula correspondente
                        
                    }
                    
        
                    if (!prontuarioEncontrado) {
                        prontuarioAntigo(idHorario, data);
                        fecharProntuarioAntigo();
                    }
                });
                tr.dataset.clickAdded = true; // Marca a linha como evento adicionado
            }
        });
        
    })
    
    
}


function prontuarioAtual(data, paciente){
    var p = document.querySelector('.container2 .info-basica .infoData')
    if(!p.innerHTML.trim() || !p.textContent.trim()){
        console.log('Não tem conteudo')
        p.innerHTML = `<strong>Data: </strong>`;
        p.append(data);
    }
    var nome = document.querySelector('.container2 .info-basica .nome');
    nome.value = paciente[0].nome
    
    var celular = document.getElementById('telefone');
    celular.value = paciente[0].celular

    var email = document.getElementById('email');
    email.value = paciente[0].email;
    document.getElementById('prontuarioAtual').style.display = 'block';
    document.getElementById('prontuarioAntigo').style.display = 'none';

    document.getElementById('relatorioTable').style.display = 'none';

}
function prontuarioAntigo(idHorario, data){
    //  document.querySelector('.container').innerHTML = '';
    console.log('data: ', data)
    console.log('Prontuario antigo')
    console.log('idHorario: ', idHorario);
    limparProntuario();
    data.map(element=>{
        console.log('element.idHorario: ', element.idHorario )
        if(idHorario == element.idHorario){
            var p = document.querySelector('.container2 .info-basica .infoData')
            if(!p.innerHTML.trim() || !p.textContent.trim()){
                console.log('Não tem conteudo')
                p.innerHTML = `<strong>Data: </strong>`;
                p.append(element.data);
            }

             // Inserindo os valores nos elementos <p>
            document.querySelector('.nome').innerHTML += element.nome;
            document.querySelector('.data-nascimento').innerHTML += element.data_nascimento;
            // document.getElementById('sexo').innerHTML += element.sexo;
            // document.getElementById('endereco').innerHTML += element.endereco;
            document.querySelector('.telefone').innerHTML += element.celular;
            document.querySelector('.email').innerHTML += element.email;

            document.querySelector('.doencaPreExistente').innerHTML += element.doencaPreExistente;
            document.querySelector('.cirurgiaAnterior').innerHTML += element.cirurgiaAnterior;
            document.querySelector('.medicamentoEmUso').innerHTML += element.medicamentoEmUso;
            document.querySelector('.alergia').innerHTML += element.alergia;
            document.querySelector('.historicoFamiliar').innerHTML += element.historicoFamiliar;

            // const exame = paciente.exames[0];
            // document.querySelector('.tipo').innerHTML += element.tipo;
            // document.querySelector('.data').innerHTML += element.data;
            // document.querySelector('.resultado').innerHTML += element.resultado;
            // document.querySelector('.comentario').innerHTML += element.comentario;

            document.querySelector('.observacao').innerHTML += element.observacaoProfissional;
            document.querySelector('.recomendacao').innerHTML += element.recomendacaoProfissional;
            document.querySelector('.planoTratamento').innerHTML += element.planoTratamento;
            }
    })
    
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
        limparProntuario();

    })
}

function limparProntuario() {
    console.log('Função de limpar prontuario')
    // Seleciona todos os elementos <p> dentro da div com a classe 'container'
    const parags = document.querySelectorAll('.container p');

    // Itera sobre cada <p> e limpa seu conteúdo
    parags.forEach(p => {
        // Mantém o conteúdo <strong> intacto, mas limpa o texto dentro dele
        const strong = p.querySelector('strong');
        if (strong) {
            p.textContent = '';
            p.innerHTML = `<strong>${strong.textContent}</strong>`;
        } else {
            p.textContent = ''; // Para <p> que não têm <strong>
        }
    });
}