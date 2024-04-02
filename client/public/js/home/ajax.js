// document.addEventListener('DOMContentLoaded', function () {
//     //document.querySelectorAll('.perfil').forEach(item => {
//         item.addEventListener('click', function () {
//             document.querySelector('.containerLoginPerfil').innerHTML = '';

//             const perfil = this.dataset.perfil;
//             console.log('Perfil clicado: ', perfil);

//             const button = document.createElement('button');''
//             button.classList.add('btn', 'btn-primary', 'loginPerfil');
//             button.dataset.perfil = perfil;
//             button.textContent = `Login ${perfil}`;

//             document.querySelector('.containerLoginPerfil').appendChild(button);
//             document.querySelector('.containerLoginPerfil').style.display = 'block';
//         });
//     });

//     document.querySelector('.containerLoginPerfil').addEventListener('click', function (event) {
//         if (event.target.classList.contains('loginPerfil')) {
//             const loginPerfil = event.target.dataset.perfil;
//             console.log('Botão clicado para fazer login: ', loginPerfil);
//             switch (loginPerfil) {
//                 case 'recepcionista':
//                     window.location.href = '/login/recepcionista';
//                     break;
//                 case 'paciente':
//                     window.location.href = '/user/login';
//                     break;
//                 case 'professor':
//                     window.location.href = '/login/professor';
//                     break;
//                 case 'psicologo':
//                     window.location.href = '/psico/login';
//                     break;
//                 case 'gestor':
//                     window.location.href = '/login/gestor';
//                     break;
//                 default:
//                     break;
//             }
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formLogin').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        // Captura os dados de login e senha do formulário
        var emailUsuario = document.getElementById('emailUsuario').value;
        var password = document.getElementById('password').value;
        
        // Cria um objeto FormData para enviar os dados do formulário
        var formData = new FormData();
        formData.append('emailUsuario', emailUsuario);
        formData.append('password', password);
        
        // Envia uma solicitação fetch para o servidor para verificar os dados do usuário
        fetch('/verificarLogin', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Retorna o conteúdo do corpo da resposta como texto
            } else {
                throw new Error('Erro ao verificar o login');
            }
        })
        .then(data => {
            if (data === 'success') {
                window.location.href = '/outraPagina'; // Substitua 'outraPagina' pelo URL da sua outra página
            } else {
                alert('Login inválido!'); // Exibe uma mensagem de erro se o login for inválido
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao verificar o login!'); // Exibe uma mensagem de erro genérica
        });
    });
});

