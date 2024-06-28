import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'
export function verificaoConsulta(perfil){
    console.log('Perfil: ', perfil);
    if(data.length>0){
        alert('Você ja tem uma consulta marcada, veja nos detalhes da sua conta.')
        return window.location.href='/user/principal/conta'
    }
    if(perfil.trim().toLowerCase() === 'paciente' || perfil.trim().toLowerCase() == 'administrador') { 
        
        return window.location.href = '/user/agendamento';
    }
    else if(perfil.trim().toLowerCase() == 'psicologo' || perfil.trim().toLowerCase() == 'administrador'){
        return window.location.href = '/psico/principal/agenda'
    }
    else if(perfil.trim().toLowerCase() == 'recepcionista' || perfil.trim().toLowerCase() =='administrador'){
        return window.location.href = '/recepcionista/principal/verificarConsulta'
    }    
    else {
        alert('Seu perfil não confiz, você retornará para página Home');
        return window.location.href = '/'
    }
}

export function verificarPerfil(perfil){

    if(perfil == 'paciente') {
        document.getElementById('agendar-consulta').style.display = 'block'
        document.querySelector('.left-section .sidebar .dashboard').style.display = 'none';
        document.getElementById('prontuario').style.display = 'none'

    }
    if(perfil == 'psicologo'){
        document.getElementById('criar-agenda').style.display = 'block'
        document.getElementById('prontuario').style.display = 'block'
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
    console.log('Perfil: ', perfil);
    verificarPerfil(perfil)

   
})

export function detalheUser(user){
    var nome = document.querySelector('.right-section .profile .info .account h5');
    nome.append(user.nome);
    var email = document.querySelector('.right-section .profile .info .account p')
    email.append(user.email);
}

export function tabelaHorarios(horarios){
    var tabela = document.querySelector('.tableHorario');
    horarios.map(horario=>{
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'selected');
        tr.setAttribute('idHorario', horario.idHorario)

        var tdData = document.createElement('td');
        tdData.setAttribute('class', 'name');
        horario.data = formatarData(horario.data);
        tdData.append(horario.data)
        tr.append(tdData);

        var tdDiaSemana = document.createElement('td');
        tdDiaSemana.setAttribute('class', 'extension');
        tdDiaSemana.append(horario.diaSemana)
        tr.append(tdDiaSemana)

        var tdHora = document.createElement('td');
        tdHora.setAttribute('class', 'size');
        horario.hora = formatarHorario(horario.hora);
        tdHora.append(horario.hora);
        tr.append(tdHora)

        var tdStatus = document.createElement('td');
        tdStatus.append(horario.status);
        tdStatus.setAttribute('class', 'size');
        tr.append(tdStatus)

        var tdBtnCancelar = document.createElement('td');
        var btnCancelar = document.createElement('button');
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.setAttribute('class', 'btn btn-cancelar');
        
        tdBtnCancelar.append(btnCancelar);
        tr.append(tdBtnCancelar);

        var tdBtnRemarcar = document.createElement('td');
        var btnRemarcar = document.createElement('button');
        btnRemarcar.textContent = 'Remarcar';
        btnRemarcar.setAttribute('class', 'btn btn-remarcar');
        
        tdBtnRemarcar.append(btnRemarcar);
        tr.append(tdBtnRemarcar);

        document.querySelector('.tableHorario tbody').append(tr);

    })
    return tabela


}

/*--------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------- */


