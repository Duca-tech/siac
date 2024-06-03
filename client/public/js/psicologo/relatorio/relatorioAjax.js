var idUser = localStorage.getItem('idUser');
console.log('idPsico: ', idUser);
var psico ={
    idPsico: idUser

}
document.addEventListener('DOMContentLoaded', function(){
    fetch('/psico/relatorio/listarUser', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(psico)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log('Resposta do Servidor: ', data)
        exibirLista(data.results);
        prontuarioDetalheUser();
    })
    .catch(error=>{
        console.error('Erro: ', error);
    })
    .finally(()=>{
        console.log('Requisição Finalizada !');
    })

    
})