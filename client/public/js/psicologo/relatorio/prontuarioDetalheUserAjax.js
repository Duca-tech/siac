import {exibirHorarios, exibirProntuario} from '/js/psicologo/relatorio/prontuarioDetalheUserFuncao.js'
import {convertDateFormat} from '/js/formatacao/funcao.js'

var idPsico = localStorage.getItem('idUser');
document.addEventListener('DOMContentLoaded', function(){
    fetch(`/psico/relatorio/detalhePaciente/consultas`)
    .then(response=>response.json())
    .then(data=>{
        console.log('Resposta do servidor: ', data);
        exibirHorarios(data.results);
        exibirProntuario(data.results);
        

    })
    .catch(error=>{
        console.error('Erro: ', error);
    })
    .finally(()=>{
        console.log('Requisição finalizada!');
    })


    document.getElementById('submit-button').addEventListener('click', function() {
        console.log('idHorario: ', window.idHorarioGlobal)
        console.log('idPac: ', window.idPacGlobal);
        var textFull = document.querySelector('.container2 .info-basica .infoData').textContent
        var dateText = textFull.split('Data: ')[1].trim();
        dateText = convertDateFormat(dateText);

        var loadingDiv = document.querySelector('.loading');
        loadingDiv.style.display = 'block';
        const prontuario = {
            idHorario: window.idHorarioGlobal,
            idPac: window.idPacGlobal,
            idPsico:idPsico,
            dataConsulta: dateText,    
            doencas: document.getElementById('doencas').value,
            cirurgias: document.getElementById('cirurgias').value,
            medicamentos: document.getElementById('medicamentos').value,
            alergias: document.getElementById('alergias').value,
            historicoFamiliar: document.getElementById('historico-familiar').value,
            tipoExame: document.getElementById('tipo-exame').value,
            dataExame: document.getElementById('data-exame').value,
            resultadosExame: document.getElementById('resultados-exame').value,
            comentariosExame: document.getElementById('comentarios-exame').value,
            observacoes: document.getElementById('observacoes').value,
            recomendacoes: document.getElementById('recomendacoes').value,
            planosTratamento: document.getElementById('planos-tratamento').value
        };


    
        fetch('/psico/prontuario/detalhePaciente/inserirProntuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prontuario)
        })
        .then(response => response.json())
        .then(data => {
            setTimeout(function() {
                loadingDiv.style.display = 'none';
                alert('Consulta Finalizada!');
                console.log('Success:', data);

                location.reload();

            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
    
})