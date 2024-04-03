function verificaoConsulta(data){
    if(data.length>0){
        alert('Você ja tem uma consulta marcada, veja nos detalhes da sua conta.');
        window.location.href='/user/principal/conta'
    }
    else{
        window.location.href = '/user/agendamento';
    }
}