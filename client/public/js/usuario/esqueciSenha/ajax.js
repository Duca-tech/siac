let id;

document.addEventListener('DOMContentLoaded', function() {
    // Mova esta parte do código para dentro do bloco DOMContentLoaded
    document.querySelector('.buttonEnviar').addEventListener('click', function(e) {
        var loader = document.querySelector('.loader');
        if (loader) loader.style.display = 'block';

        var containerEmail = document.querySelector('.formEsqueciSenha');
        if (containerEmail) containerEmail.style.display = 'none';

        e.preventDefault();
        console.log('evento de clicado acionado!');
        var email = document.querySelector('.email').value;
        console.log('Email: ', email);
        var data = {
            email: email
        }

        fetch('http://localhost:3600/esqueciSenha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //Necessário essa aplicacção
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados do Servidor: ', data);
            console.log('data.results.idUser: ', data.results.idUser);

            id = data.results.idUser;

            localStorage.setItem('redefSenha', data.results.idUser.toString());

            console.log('refSenha: ', localStorage.getItem('redefSenha'));
            setTimeout(() => {
                if (containerEmail) containerEmail.style.display = 'block';
                if (loader) loader.style.display = 'none';
                alert('Código enviado para o E-mail com sucesso!');
            }, 3000);
        });
    });
});

export { id };
