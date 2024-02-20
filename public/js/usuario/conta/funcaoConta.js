
function detalheConta(conta){
    $('#nome').val(conta.nome);
    $('#email').val(conta.email);
    $('#nomeUser').val(conta.nomeUser);
    $('#celular').val(conta.celular)
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




