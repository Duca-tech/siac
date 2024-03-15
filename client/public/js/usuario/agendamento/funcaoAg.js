import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'

export function verificacao(psicologos, agenda, horarios){
    if(!agenda){
        $('#psicoDados').append(`<h3>Sem agenda para consultas!</h3>`);
    }

        
    
}
export function selecionarPsico(psicologos){

    var selecao = $(`<select id='listaSelecaoPsico'><option disabled selected>Escolha o Profissional</option></select>`);
    psicologos.map(function(psico){
         var opcao = $(`<option value='${psico.idPsico}'>${psico.nome}</option>`)
         selecao.append(opcao);
    })
    
    $('#psicoDados').append(selecao);
}

export function mostrarPsico(psicologos,agenda, horarios){
   


}

   
   



   
