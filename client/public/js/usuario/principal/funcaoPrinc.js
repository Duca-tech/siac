function verificaoConsulta(data, perfil){
    if(data.length>0){
        alert('Você ja tem uma consulta marcada, veja nos detalhes da sua conta.')
        window.location.href='/user/principal/conta'
    }
    else{
        if(perfil =='paciente') return window.location.href = '/user/agendamento';
        window.location.href = '/'
    }
}

function verificarPerfil(perfil){

    if(perfil == 'paciente') document.getElementById('paciente').style.display = 'block'
    if(perfil == 'psicologo') document.getElementById('psicologo').style.display = 'block'
    if(perfil == 'recepcionista') document.getElementById('recepcionista').style.display = 'block'


}

document.addEventListener('DOMContentLoaded', function () {
    
    var perfil = localStorage.getItem('perfil');
    console.log('Perfil: ', perfil)
    verificarPerfil(perfil)

   
})
