function inserirEndereco(data){
    document.getElementById('logradouroInput').value = data.logradouro;
    document.getElementById('bairroInput').value = data.bairro;
    document.getElementById('localidadeInput').value = data.localidade;
    document.getElementById('uf').value = data.uf;
    // console.log('containerCep: ', containerCep);
    document.querySelectorAll('.containerCep').forEach(conteinerCep=>{
        conteinerCep.style.display = 'block';

    }) // Usando querySelector para selecionar o primeiro elemento com a classe 'containerCep'
    
   
}

function verifcarCadastro(message, user){

    if(message == 'Usuário ja cadastrado no Sistema'){
        
        alert('E-mail ja Utilizado por outro usuário!' + '\n' + user.nome + ' - ' + user.email + ' - ' + user.perfil );
    }
    
    if (message == 'Usuário inserido com sucesso!'){
        alert(message);
        window.location.href = '/user/login';
    }
}

function verificarSenha(primeiraSenha, segundaSenha) {
    
    
    if (primeiraSenha.value == segundaSenha.value && primeiraSenha != '' && segundaSenha !='') {
        segundaSenha.style.border = '1px solid green';
        segundaSenha.style.padding = '5px';
        mensagemSenha.classList.add('none'); // Oculta a mensagem se as senhas coincidirem
        document.getElementById('buttonEnviarCadastro').disabled = false; // Ativar o botão se as senhas coincidirem
    } else {
        segundaSenha.style.border = '1px solid red';
        mensagemSenha.classList.remove('none'); // Mostra a mensagem se as senhas não coincidirem
        document.getElementById('buttonEnviarCadastro').disabled = true; // Desativar o botão se as senhas não coincidirem

        if(segundaSenha.value == ""){
            mensagemSenha.classList.add('none'); // Oculta a mensagem se as senhas coincidirem

        }
    }
}
