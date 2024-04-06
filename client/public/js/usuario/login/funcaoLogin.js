function verificarLogin(data){

    if(data.perfil == 'psicologo') return window.location.href = '/psico/principal'
    if(data.perfil == 'recepcionista') return window.location.href = ''
    if(data.perfil == 'paciente') return window.location.href = '/user/principal'

}