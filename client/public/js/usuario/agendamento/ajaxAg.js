// import {verificacao} from '/js/usuario/agendamento/funcaoAg.js'

document.addEventListener('DOMContentLoaded', function () {

    // Variáveis globais:
    let hora;
    let button;
    let msgWpp;
    let idUser = localStorage.getItem('idUser');

    fetch('/user/agendamento/dadosPsico')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response falhou.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Psicologos, agenda e horários:  ', data);
            verificacao(data.psicologos, data.agenda, data.horarios);
            generateCalendar(data.agenda, data.horarios);
            selecionarPsico(data.psicologos);
        })
        .catch(error => {
            console.error('Erro no fetch de dados:', error);
        })
        .finally(() => {
            console.log('Requisição Finalizada');
        });

    document.getElementById('containerAgenda').addEventListener('click', function (event) {
        if (event.target.classList.contains('buttonHora')) {
            button = event.target;
            hora = event.target.textContent;
            console.log('Id do Usuario: ', idUser);
            document.getElementById('containerConfirmacao').style.display = 'block';
            document.getElementById('containerAgenda').style.display = 'none';
        }
    });

    document.getElementById('containerConfirmacao').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            console.log('Id do usuário: ', idUser);
            console.log('button: ', hora);
            msgWpp = document.getElementById('msgWpp').checked;

            button.style.display = 'none';

            let data = {
                idUser: idUser,
                hora: hora
            };

            console.log('Objeto data: ', data);

            let url = msgWpp ? '/user/inserirHorario/wpp' : '/user/inserirHorario';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response falhou.');
                    }
                    return response.json();
                })
                .then(resultServer => {
                    console.log(resultServer);
                    document.querySelectorAll('#containerConfirmacao button').forEach(button => {
                        button.style.display = 'none';
                    });
                    document.getElementById('containerMsgWpp').animate({
                        opacity: '0'
                    }, 1000, function () {
                        document.getElementById('containerConfirmacao').querySelector('h5').animate({
                            opacity: 'toggle',
                            height: 'toggle'
                        }, 1000, function () {
                            document.getElementById('containerConfirmacao').animate({
                                opacity: '0'
                            }, 1000, function () {
                                document.getElementById('containerConfirmacao').style.display = 'none';
                                document.getElementById('containerAgenda').animate({
                                    height: 'toggle',
                                    opacity: 'toggle'
                                }, 1000, function () {
                                    window.location.reload();
                                });
                            });
                        });
                    });
                    window.location.href = '/user/principal';
                })
                .catch(error => {
                    console.error('Erro:', error);
                })
                .finally(() => {
                    console.log('Requisição finalizada!');
                });
        }
    });

    document.getElementById('voltar').addEventListener('click', function () {
        window.location.href = '/user/principal';
    });
});
