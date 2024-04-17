document.addEventListener('DOMContentLoaded', function(){

    var idUser = localStorage.getItem('redefSenha');
    console.log('redefSenha idUser: ', idUser);

    var primeiraSenha = document.getElementById('primeiraSenha');
    var segundaSenha = document.getElementById('segundaSenha');
    var button = document.getElementById('enviarNovaSenha');

    segundaSenha.addEventListener('input', function(){
        verificarSenha(primeiraSenha, segundaSenha);
    });

    button.addEventListener('click', function(){
        console.log('senha nova: ', segundaSenha.value);
        var senha = {
            senha: senha,
            idUser: idUser
        }

        fetch('http://localhost:3600/redefinirSenha', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senha)   
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Resposta do Servidor: ', data);

            
        })
    })
});
