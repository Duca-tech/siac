import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'

export function detalheConta(conta){
    console.log('nome: ', conta.nome)
    $('#nome').val(conta.nome);
    $('#email').val(conta.email);
    $('#nomeUser').val(conta.nomeUser);
    $('#celular').val(conta.celular)
}

export function updateRelizado(usuario){
    $('.msgServer').animate({
        'heigth':'toggle',
        'opacity':'0',

    }, 2500, function(){
        $('.msgServer').css({'display':'none', 'opacity':'1'})
        
        $('#buttonAtualizar').animate({
            'heigth':'toggle'
        })
        $('input').prop('disabled', true)
       
        $('#containerConfCan').css({
            'display':'none'
        })
    })
}

export function consultas(consultas){   
    if(consultas[0].data && consultas[0].hora){
        var horaForm = formatarHorario(consultas[0].hora);
        var dataForm = formatarData(consultas[0].data);
        
        var consultasConta = $(`<div>
            <h5 style='border-bottom: 1px solid #DCDCDC'>Consultas Agendadas: </h5>
        </div>`)
        consultas.map(function(consulta){
            consultasConta.append(`
            <div class= 'd-flex align-items-center' style='border-bottom: 1px solid #A9A9A9'>
                <span class='espacamentoConsulta'>${consulta.nome}</span>
                <span class='espacamentoConsulta'>${consulta.celular}</span>
                
                <span class='espacamentoConsulta'>${dataForm}</span>
                <span class='espacamentoConsulta'>${horaForm}</span><br><br>

                <span class='espacamentoConsulta'><button data-id='${consulta.idHorario}' class='btn btn-danger'>Cancelar Consulta</button></span><br><br>
            </div>
                `)
        })
        $('#containerConsultas').append(consultasConta);
    }
    else{
        $('#containerConsultas').append(`
           <h3>Sem consultas!</h3>
        `)
    }
}





   
    
    
        

        






