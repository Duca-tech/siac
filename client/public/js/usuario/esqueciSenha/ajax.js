var objId = {}
document.addEventListener('DOMContentLoaded', function(){

    document.querySelector('.buttonEnviar').addEventListener('click', function(e){
        var loader = document.querySelector('.loader');
        loader.style.display = 'block';

        var containerEmail = document.querySelector('.formEsqueciSenha');
        containerEmail.style.display = 'none'

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

            var id = data.results.idUser;

            objId.idUser = id
            
            
            
            localStorage.setItem('redefSenha', data.results.idUser.toString());

            console.log('refSenha: ', localStorage.getItem('redefSenha'));
            setTimeout(() => {
                containerEmail.style.display = 'block'
                loader.style.display = 'none'
                alert('Código enviado para o E-mail com sucesso!');
            }, 3000);   

        })
    })




})

export default {
    objId
}