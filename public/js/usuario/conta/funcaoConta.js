
function detalheConta(conta){
    console.log('nome: ', conta[0].nome)
    $('#nome').val(conta[0].nome);
    $('#email').val(conta[0].email);
    $('#nomeUser').val(conta[0].nomeUser);
    $('#celular').val(conta[0].celular)
}

function updateRelizado(usuario){

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

function consultas(consultas){
    
        
   
    if(consultas[0].data && consultas[0].hora){
        for(let i = 0; i<consultas.length; i++){
            var horaForm = formatarHora(consultas[i].hora);
            var dataForm = formatarData(consultas[i].data);
        }
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

                
                <span class='espacamentoConsulta'><button class='btn btn-danger'>Cancelar Consulta</button></span><br><br>
                
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

function formatarData(data){
    var newData = new Date(data);
    var dia = newData.getDay();
    var ano = newData.getFullYear();
    var mes = newData.getMonth() + 1;

    var dataForm = `${dia}/${mes}/${ano}`;
    return dataForm; 
}

function formatarHora(hora){
    var [hora, minuto] = hora.split(':');

    var horaForm = `${hora}:${minuto}`;
    console.log(horaForm);

    return horaForm
}



   
    
    
        

        






