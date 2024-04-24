function inserirEndereco(data){
    document.getElementById('logradouroInput').value = data.logradouro;
    document.getElementById('bairroInput').value = data.bairro;
    document.getElementById('localidadeInput').value = data.localidade;
    document.getElementById('uf').value = data.uf;

    const containerCep = document.querySelector('.containerCep'); // Usando querySelector para selecionar o primeiro elemento com a classe 'containerCep'
    console.log('containerCep: ', containerCep);
    containerCep.style.display = 'block';
    
}

function verifcarCadastro(data){
    if(data == 'Usuário ja cadastrado no Sistema'){
        alert(data)
    }
    
    if (data == 'Usuário inserido com sucesso!'){
        alert(data);
        window.location.href = '/user/login';
    }
}