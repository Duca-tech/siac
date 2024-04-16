document.addEventListener('DOMContentLoaded', function(){

    var primeiraSenha = document.getElementById('primeiraSenha');
    var segundaSenha = document.getElementById('segundaSenha');
    var button = document.getElementById('enviarNovaSenha');

    segundaSenha.addEventListener('input', function(){
        verificarSenha(primeiraSenha, segundaSenha);
    });

    button.addEventListener('click', function(){
        console.log('senha nova: ', segundaSenha.value);
    })
});
