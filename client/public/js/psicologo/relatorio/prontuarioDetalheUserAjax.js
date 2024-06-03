import {exibirHorarios, exibirProntuario} from '/js/psicologo/relatorio/prontuarioDetalheUserFuncao.js'
document.addEventListener('DOMContentLoaded', function(){
    fetch(`/psico/relatorio/detalhePaciente/consultas`)
    .then(response=>response.json())
    .then(data=>{
        console.log('Resposta do servidor: ', data);
        exibirHorarios(data.results);
        exibirProntuario(data.results)
    })
    .catch(error=>{
        console.error('Erro: ', error);
    })
    .finally(()=>{
        console.log('Requisição finalizada!');
    })
})