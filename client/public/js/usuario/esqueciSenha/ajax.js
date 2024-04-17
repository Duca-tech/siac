document.addEventListener('DOMContentLoaded', function(){

    document.querySelector('.buttonEnviar').addEventListener('click', function(e){
        e.preventDefault();
        console.log('evento de clicado acionado!');
        var email = document.querySelector('.email').value;
        console.log('Email: ', email);
        var data ={
            email: email
        }

        fetch('http://localhost:3600/esqueciSenha', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json' //Necessário essa aplicacção
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Dados do Servidor: ', data);
            console.log('data.results.idUser: ', data.results.idUser);
            localStorage.setItem('redefSenha', data.results.idUser);

        })
    })




})