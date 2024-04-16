function verificarSenha(primeiraSenha, segundaSenha) {
    var novaSenha = document.getElementById('enviarNovaSenha');
    
    
    if (primeiraSenha.value == segundaSenha.value && primeiraSenha != '' && segundaSenha !='') {
        segundaSenha.style.border = '1px solid green';
        novaSenha.style.padding = '5px';
        novaSenha.style.background = 'green';
        novaSenha.disabled = false; // Ativar o botão se as senhas coincidirem
    } else {
        segundaSenha.style.border = '1px solid red';
        novaSenha.disabled = true; // Desativar o botão se as senhas não coincidirem
        novaSenha.style.background = 'brown'
    }
}
