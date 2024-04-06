function verificaoConsulta(data){
    if(data.length>0){
        alert('Você ja tem uma consulta marcada, veja nos detalhes da Sua conta ');
        window.location.href='/user/principal/conta'
    }
    else{
        window.location.href = '/user/agendamento';
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
