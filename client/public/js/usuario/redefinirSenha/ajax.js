var idUser = localStorage.getItem('redefSenha');
import objId from '/js/usuario/esqueciSenha/ajax.js';

console.log(objId); // Acesso a propriedade objId do objeto exportado


document.addEventListener('DOMContentLoaded', function(){

    console.log('redefSenha idUser: ', idUser);
    console.log('redefSenha idUser: ', objId.idUser);

    var primeiraSenha = document.getElementById('primeiraSenha');
    var segundaSenha = document.getElementById('segundaSenha');
    var button = document.getElementById('enviarNovaSenha');

    segundaSenha.addEventListener('input', function(){
        verificarSenha(primeiraSenha, segundaSenha);
    });

    button.addEventListener('click', function(){
        console.log('senha nova: ', segundaSenha.value);
        var senha = {
            senha: segundaSenha.value,
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
