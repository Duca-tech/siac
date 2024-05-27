import { id } from '/js/usuario/esqueciSenha/ajax.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('redefSenha idUser: ', id);

    var primeiraSenha = document.getElementById('primeiraSenha');
    var segundaSenha = document.getElementById('segundaSenha');
    var button = document.getElementById('enviarNovaSenha');

    if (primeiraSenha && segundaSenha && button) {
        segundaSenha.addEventListener('input', function() {
            verificarSenha(primeiraSenha, segundaSenha);
        });

        button.addEventListener('click', function() {
            console.log('senha nova: ', segundaSenha.value);
            var senha = {
                senha: segundaSenha.value,
                idUser: id
            }

            fetch('http://localhost:3600/redefinirSenha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(senha)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Resposta do Servidor: ', data);
                alert(data.message);
                window.location = '/';
            });
        });
    } else {
        console.error('Elementos necessários não encontrados no DOM');
    }
});
