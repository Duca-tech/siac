import {exibirHorarios, exibirProntuario} from '/js/psicologo/relatorio/prontuarioDetalheUserFuncao.js'
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
        const prontuario = {
            nome: document.getElementById('nome').value,
            dataNascimento: document.getElementById('data-nascimento').value,
            sexo: document.getElementById('sexo').value,
            endereco: document.getElementById('endereco').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
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
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
    
})