var idUser = localStorage.getItem('idUser');
var token = localStorage.getItem('token');
var perfil = localStorage.getItem('perfil');
document.addEventListener('DOMContentLoaded', function () {
    // Tela principal quando clica em agendar consulta:
    var id ={
        idUser: idUser
    }
    fetch('/user/principal/conta/detalhes',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(id)
    })
    .then(response=>response.json())
    .then(data=>{
        console.log('Resposta do Servidor: ', data);
        detalheUser(data.data[0]);
    })
    .catch(error=>{
        console.error('erro: ', error);
    })
    .finally(()=>{
        console.log('Requisição finalizada!');
    })
})

function detalheUser(user){
    var nome = document.querySelector('.right-section .profile .info .account h5');
    nome.append(user.nome);
    var email = document.querySelector('.right-section .profile .info .account p')
    email.append(user.email);
}