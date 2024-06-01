function verificaoConsulta(data, perfil){
    console.log('Perfil: ', perfil);
    if(data.length>0){
        alert('Você ja tem uma consulta marcada, veja nos detalhes da sua conta.')
        window.location.href='/user/principal/conta'
    }
    if(perfil.trim().toLowerCase() === 'paciente' || perfil.trim().toLowerCase() == 'administrador') { 
        
        window.location.href = '/user/agendamento';
    }
    else if(perfil.trim().toLowerCase() == 'psicologo' || perfil.trim().toLowerCase() == 'administrador'){
        window.location.href = '/psico/principal/agenda'
    }
    else if(perfil.trim().toLowerCase() == 'recepcionista' || perfil.trim().toLowerCase() =='administrador'){
        window.location.href = '/recepcionista/principal/verificarConsulta'
    }    
    else {
        alert('Seu perfil não confiz, você retornará para página Home');
        window.location.href = '/'
    }
}

function verificarPerfil(perfil){

    if(perfil == 'paciente') {
        document.getElementById('agendar-consulta').style.display = 'block'
        document.querySelector('.left-section .sidebar .dashboard').style.display = 'none';
    }
    if(perfil == 'psicologo'){
        document.getElementById('criar-agenda').style.display = 'block'
        document.querySelector('.left-section .sidebar .dashboard').style.display = 'none';
    } 
    if(perfil == 'recepcionista'){
        document.getElementById('recepcionista').style.display = 'block'
        document.querySelector('.left-section .sidebar .dashboard').style.display = 'none';

    } 
    if(perfil == 'administrador'){
        document.getElementById('agendar-consulta').style.display = 'block'
        document.getElementById('criar-agenda').style.display = 'block'
        // document.getElementById('recepcionista').style.display = 'block'
    }


}

document.addEventListener('DOMContentLoaded', function () {
    
    var perfil = localStorage.getItem('perfil');
    console.log('Perfil: ', typeof perfil, perfil);
    verificarPerfil(perfil)

   
})

function detalheUser(user){
    var nome = document.querySelector('.right-section .profile .info .account h5');
    nome.append(user.nome);
    var email = document.querySelector('.right-section .profile .info .account p')
    email.append(user.email);
}

/*--------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------- */


