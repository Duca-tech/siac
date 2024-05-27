function verificaoConsulta(data, perfil){
    console.log('Perfil: ', perfil);
    if(data.length>0){
        alert('Você ja tem uma consulta marcada, veja nos detalhes da sua conta.')
        window.location.href='/user/principal/conta'
    }
    if(perfil.trim().toLowerCase() === 'paciente') { 
        
        window.location.href = '/user/agendamento';
    }
    else if(perfil == 'psicologo'){
        window.location.href = '/psico/principal/agenda'
    }
    else if(perfil == 'recepcionista'){
        window.location.href = '/recepcionista/principal/verificarConsulta'
    }    
    else {
        alert('Seu perfil não confiz, você retornará para página Home');
        window.location.href = '/'
    }
}

function verificarPerfil(perfil){

    if(perfil == 'paciente') document.getElementById('agendar-consulta').style.display = 'block'
    if(perfil == 'psicologo') document.getElementById('criar-agenda').style.display = 'block'
    if(perfil == 'recepcionista') document.getElementById('recepcionista').style.display = 'block'


}

document.addEventListener('DOMContentLoaded', function () {
    
    var perfil = localStorage.getItem('perfil');
    console.log('Perfil: ', typeof perfil, perfil);
    verificarPerfil(perfil)

   
})

/*--------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------- */


