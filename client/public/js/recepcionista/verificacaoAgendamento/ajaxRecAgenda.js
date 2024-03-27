let idHorario;
let idUser;

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('buttonVerify').addEventListener('click', function () {
        const inputCred = document.getElementById('inputVerify').value;
        if (!inputCred) {
            alert('Não há nada no campo busca de credenciais.');
        } else {
            const credencial = {
                inputCred: inputCred
            };
            
            fetch('/recepcionista/principal/verificarConsulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credencial)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response falhou.');
                    }
                    return response.json();
                })
                .then(response => {
                    console.log('Resposta do servidor: ', response);
                    verificarConsulta(response.consulta[0]);
                    idHorario = response.consulta[0].idHorario;
                    idUser = response.consulta[0].idUser;
                })
                .catch(error => {
                    console.error('Erro:', error);
                })
                .finally(() => {
                    console.log('Requisição finalizada!');
                });
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target.id === 'confirmarPresença') {
            console.log('Id Horario da Consulta: ', idHorario);
            console.log('Id User: ', idUser);
            const horario = {
                idHorario: idHorario,
                idUser: idUser
            };

            fetch('/recepcionista/principal/verificarConsulta/confirmarPresenca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(horario)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response falhou.');
                    }
                    return response.json();
                })
                .then(response => {
                    console.log('Resposta do servidor: ', response);
                    console.log('Dados: ', response.dados[0]);
                    
                    putConsulta(response.dados[0]);
                })
                .catch(error => {
                    console.error('Erro:', error);
                })
                .finally(() => {
                    console.log('Requisição finalizada!');
                });
        }
    });
});
