$(document).ready(function(){
    
    $('#date').change(function(){
        var dataAtual = new Date(); //data atual
        var data = $(this).val();

        var diaSemana = new Date(data);

       var diaSemanaFormatado = diaSemana.toLocaleDateString('pt-BR', {weekday: 'long'})
       console.log('Dia da semana: ', diaSemanaFormatado);
        if(diaSemana<dataAtual){
            $('#diaSemana').val('');
            $('#date').val('DD/MM/AAAA');
            $('#containerDiaSemana').css({
                'display':'none'
            })
            alert('Não pode Inserir uma data anterior a data de hoje');
           
        }   
        else{
            $('#diaSemana').val(diaSemanaFormatado);
            $('#containerDiaSemana').css({
                'display':'block'
            })
        }
    })

   
})