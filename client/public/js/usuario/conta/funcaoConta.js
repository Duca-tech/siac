import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'

export function detalheConta(conta){
    console.log('nome: ', conta.nome)
    $('#nome').val(conta.nome);
    $('#email').val(conta.email);
    $('#nomeUser').val(conta.nomeUser);
    $('#celular').val(conta.celular)
}

export function updateRelizado(){
    $('#successMessage').addClass('show');
        setTimeout(function() {
            $('#successMessage').removeClass('show');
            location.reload();

        }, 1500);
}

// export function consultas(consultas){   
//     if(consultas[0].data && consultas[0].hora){
//         var horaForm = formatarHorario(consultas[0].hora);
//         var dataForm = formatarData(consultas[0].data);
        
//         var consultasConta = $(`<div>
//             <h5 style='border-bottom: 1px solid #DCDCDC'>Consultas Agendadas: </h5>
//         </div>`)
//         consultas.map(function(consulta){
//             consultasConta.append(`
//             <div class= 'd-flex align-items-center' style='border-bottom: 1px solid #A9A9A9'>
//                 <span class='espacamentoConsulta'>${consulta.nome}</span>
//                 <span class='espacamentoConsulta'>${consulta.celular}</span>
                
//                 <span class='espacamentoConsulta'>${dataForm}</span>
//                 <span class='espacamentoConsulta'>${horaForm}</span><br><br>

//                 <span class='espacamentoConsulta'><button data-id='${consulta.idHorario}' class='btn btn-danger'>Cancelar Consulta</button></span><br><br>
//             </div>
//                 `)
//         })
//         $('#containerConsultas').append(consultasConta);
//     }
//     else{
//         $('#containerConsultas').append(`
//            <h3>Sem consultas!</h3>
//         `)
//     }
// }





   
    
    
        

        






