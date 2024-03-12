$(document).ready(function(){
    // Ajax para tela de cadastro usuário
    $('#formCadastroUser').submit(function(event){
        const formData = new FormData($('#formCadastroUser')[0]);
        $.ajax({
            url: `http://localhost:3600/user/cadastro`,
            type: 'POST',
            dataType: 'json', // Especifica o tipo de dados que você espera receber do servidor em resposta à sua solicitação.
            data: formData
        })
        .done(function(json){
            console.log('Usuário adicionado com sucesso!',json);
            window.location.href ='/user/login'
            
        })
        .fail(function(xhr, status, errorThrown){
            console.log('Erro ao adicionar usuário.');
            console.log('Status: ', status);
            console.log('Erro: ', errorThrown);
            console.dir(xhr); // console.dir() é um método do console em JavaScript que exibe uma representação em formato de árvore de um objeto JavaScript passado como argumento.
        })
        .alwxays(function(){
            console.log('A requisição ajax foi feita!');
        })
        return false; // Impede o envio padrão do formulário
    })
    // Fim da tela de cadastro do usuario 
})