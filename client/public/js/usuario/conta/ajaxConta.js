import { consultas, updateRelizado, detalheConta } from '/js/usuario/conta/funcaoConta.js'

document.addEventListener('DOMContentLoaded', function () {

    // Tela de detalhes da conta do usuario:
    const idUser = localStorage.getItem('idUser');
    console.log('idUser para página de detalhes de conta: ', idUser);
    var id = { idUser }

    fetch('/user/principal/conta/detalhes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário. Status: ' + response.status);
            }
            return response.json(); // Retorna os dados como JSON
        })
        .then(response => {
            console.log('Resposta do servidor:', response);
            detalheConta(response.data[0]);
            consultas(data[0]);
        })
        .catch((error) => {
            console.error('Erro na requisição:', error);
        })
        .finally(() => {
            console.log('Requisição finalizada!');
        })

    // Atualizar conta:
    $('#buttonAtualizar').on('click', () => {
        $('input').prop('disabled', false);
        $('#containerConfCan').show();
        $('#buttonAtualizar').hide();
    })

    $('#buttonCancelar').on('click', () => {
        $('#containerConfCan').hide();
        $('#buttonAtualizar').show();
        $('input').prop('disabled', true);
    });

    $('#buttonConfirmar').on('click', () => {
        const nome = $('#nome').val();
        const email = $('#email').val();
        const celular = $('#celular').val();
        const nomeUser = $('#nomeUser').val();
        const usuario = { nome, email, celular, nomeUser };

        fetch(`/user/principal/conta/update/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Resposta do servidor: ', data.message);
                updateRelizado(data.data);
                location.reload();
            })
            .catch((error) => {
                console.error('Erro na atualização:', error);
            });
    });

    $('#containerConsultas').on('click', 'button', (e) => {
        const idHorario = $(e.target).data('id');
        console.log('Id horario: ', idHorario);

        fetch(`/user/principal/conta/deletarConsulta/${idHorario}`, {
            method: 'DELETE',
            //por padrão, fetch (DELETE) não necessita de headers nem body na requisição pois não envia dados para o servidor.
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Resposta do Servidor: ', data);
                alert('Consulta excluida com sucesso!');
                location.reload();
            })
            .catch((error) => {
                console.error('Erro ao excluir consulta:', error);
            });
    });

    $('.voltar').on('click', () => {
        window.location.href = '/user/principal';
    });
})