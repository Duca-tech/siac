import { verificaoConsulta, verificarPerfil, detalheUser, tabelaHorarios } from '/js/usuario/principal/funcaoPrinc.js'

var idUser = localStorage.getItem('idUser');
var token = localStorage.getItem('token');
var perfil = localStorage.getItem('perfil');

// O listener é criado para reagir aos clicks e interações do usuário com a tela:
document.addEventListener('DOMContentLoaded', async () => {

    // Tela principal quando clica em agendar consulta:
    var id = {
        idUser: idUser
    }
    //console.log('id: ', idUser);

    try {
        const response = await fetch('/user/principal/ConsultasMarcadas', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(id)
        });

        const data = await response.json();
        //console.log('Data: ', data);
        await tabelaHorarios(data.results);

        var tabela = document.querySelector('.tableHorario tbody');
        if (tabela.children.length === data.results.length) {
            document.querySelectorAll('.btn-remarcar').forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelector('.modal').style.display = 'block';
                    const linha = this.closest('tr');
                    var idHorario = linha.getAttribute('idHorario');
                    remarcarConsulta(idHorario);
                });
            });

            document.querySelectorAll('.btn-cancelar').forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelector('.modal').style.display = 'block';
                    const linha = this.closest('tr');
                    var idHorario = linha.getAttribute('idHorario');
                    cancelarConsulta(idHorario);
                });
            });
        }
    }
    catch (error) {
        console.error('error: ', error);
    }
    finally {
        console.log('Requisição Finalizada!');
    }


    // Query selectors:
    document.querySelector('.left-section .sidebar .dashboard').addEventListener('click', () => {
        window.location.href = '/user/dash';
    })

    document.querySelector('.left-section .sidebar .item #historico-consultas').addEventListener('click', function () {
        window.location.href = '/user/principal'
    })
    
    document.querySelector('.main .quick-access .item').addEventListener('click', () => {
    });

    document.querySelector('.right-section .profile').addEventListener('click', () => {
        window.location.href = '/user/principal/conta';
    });

    document.querySelector('.left-section .sign-out').addEventListener('click', () => {
        window.location.href = '/';
    });

    document.getElementById('historico-consultas').addEventListener('click', () => {
        window.location.href = '/user/consultas/historico'
    })

    document.getElementById('agendar-consulta').addEventListener('click', () => {
        window.location.href = '/user/agendamento'
    })

    document.getElementById('criar-agenda').addEventListener('click', () => {
        window.location.href = '/psico/principal/agenda'
    })
    document.getElementById('prontuario').addEventListener('click', () => {
        window.location.href = '/psico/prontuario'
    })

    $('#logout').on('click', (e) => {
        e.preventDefault();
        window.location.href = '/'
    })

    document.getElementById('verificarAgenda').addEventListener('click', () => {
        window.location.href = '/recepcionista/principal/verificarConsulta'
    })
});


function remarcarConsulta(idHorario) {
    document.getElementById('confirmButton').addEventListener('click', () => {
        window.location.href = '/user/agendamento/remarcacao?idHorario=' + idHorario
    })

    document.getElementById('cancelButton').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
    })
}

function cancelarConsulta(idHorario) {
    document.getElementById('confirmButton').addEventListener('click', () => {
        console.log('Evento de cancelar consulta')
        fetch('/user/agendamento/cancelarConsulta?idHorario=' + idHorario)
            .then(response => response.json())
            .then(data => {
                console.log('data: ', data)
                alert(data.message);
                location.reload();
            })

    })

    document.getElementById('cancelButton').addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
    })
}