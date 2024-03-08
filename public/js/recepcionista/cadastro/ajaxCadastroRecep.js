$(document).ready(function(){
    // AJAX para cadastro de recepcionista
    $('#formCadastroRecep').submit(function(event){
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtém os dados do formulário
        const formData = new FormData($(this)[0]);

        // Envia a requisição AJAX
        $.ajax({
            url: 'http://localhost:3600/recepcionista/cadastro',
            type: 'POST',
            dataType: 'json',
            data: formData,
            processData: false, // Não processar os dados (necessário quando se utiliza FormData)
            contentType: false // Não definir o tipo de conteúdo (necessário quando se utiliza FormData)
        })
        .done(function(response){
            console.log('Recepcionista cadastrado com sucesso:', response);
            // Redireciona para a página de login ou outra página desejada
            window.location.href = '/recepcionista/login';
        })
        .fail(function(xhr, status, error){
            console.error('Erro ao cadastrar recepcionista:', error);
            console.log('Status:', status);
            console.dir(xhr);
        });
    });
});
