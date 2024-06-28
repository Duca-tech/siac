

import {verificaoConsulta, verificarPerfil, detalheUser, tabelaHorarios} from '/js/usuario/principal/funcaoPrinc.js'
var idUser = localStorage.getItem('idUser');
var token = localStorage.getItem('token');
var perfil = localStorage.getItem('perfil');
document.addEventListener('DOMContentLoaded', async function () {
    // Tela principal quando clica em agendar consulta:
    var id ={
        idUser: idUser
    }
    console.log('id: ', idUser);

    try {
        const response = await fetch('/user/principal/ConsultasMarcadas', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(id)
        });
        const data = await response.json();
        console.log('Data: ', data);
        await tabelaHorarios(data.results);

        var tabela = document.querySelector('.tableHorario tbody');
        if (tabela.children.length === data.results.length) {
            document.querySelectorAll('.btn-remarcar').forEach(button => {
                button.addEventListener('click', function () {
                    document.querySelector('.modal').style.display = 'block';
                    const linha = this.closest('tr');
                    var idHorario = linha.getAttribute('idHorario');
                    remarcarConsulta(idHorario);
                });
            });
        
            document.querySelectorAll('.btn-cancelar').forEach(button => {
                button.addEventListener('click', function () {
                    document.querySelector('.modal').style.display = 'block';
                    const linha = this.closest('tr');
                    var idHorario = linha.getAttribute('idHorario');
                    cancelarConsulta(idHorario);
                });
            });
        }
    } catch (error) {
        console.error('error: ', error);
    } finally {
        console.log('Requisição Finalizada!');
    }
    

    document.querySelector('.left-section .sidebar .dashboard').addEventListener('click', function(){
        window.location.href = '/user/dash';
    })

    
    document.querySelector('.main .quick-access .item').addEventListener('click', function () {
        
        
    });

    document.querySelector('.right-section .profile').addEventListener('click', function () {
        window.location.href = '/user/principal/conta';
    });

    document.querySelector('.left-section .sign-out').addEventListener('click', function () {
            window.location.href = '/';
        
    });

    document.getElementById('agendar-consulta').addEventListener('click', function(){
        window.location.href = '/user/agendamento'
    })

    document.getElementById('criar-agenda').addEventListener('click', function(){
       window.location.href = '/psico/principal/agenda'
    })
    document.getElementById('prontuario').addEventListener('click', function(){
        window.location.href = '/psico/prontuario'
    })

    $('#logout').on('click', function(e){
        e.preventDefault();
        window.location.href = '/'
    })

    document.getElementById('verificarAgenda').addEventListener('click', function(){
        window.location.href = '/recepcionista/principal/verificarConsulta'
    })

    
    


});


function remarcarConsulta(idHorario){
    document.getElementById('confirmButton').addEventListener('click', function(){
        window.location.href = '/user/agendamento/remarcacao?idHorario=' + idHorario
    })

    document.getElementById('cancelButton').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'none';
    })
    
}

function cancelarConsulta(idHorario){
    document.getElementById('confirmButton').addEventListener('click', function(){
        console.log('Evento de cancelar consulta')
        fetch('/user/agendamento/cancelarConsulta?idHorario=' + idHorario)
        .then(response=>response.json())
        .then(data=>{
            console.log('data: ', data)
            alert(data.message);
            location.reload();
        })

        
    })

    document.getElementById('cancelButton').addEventListener('click', ()=>{
        document.querySelector('.modal').style.display = 'none';
    })
}