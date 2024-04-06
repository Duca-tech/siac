document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.perfil').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelector('.containerLoginPerfil').innerHTML = '';

            const perfil = this.dataset.perfil;
            console.log('Perfil clicado: ', perfil);

            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary', 'loginPerfil');
            button.dataset.perfil = perfil;
            button.textContent = `Login ${perfil}`;

            document.querySelector('.containerLoginPerfil').appendChild(button);
            document.querySelector('.containerLoginPerfil').style.display = 'block';
        });
    });

    document.querySelector('.containerLoginPerfil').addEventListener('click', function (event) {
        if (event.target.classList.contains('loginPerfil')) {
            const loginPerfil = event.target.dataset.perfil;
            console.log('Botão clicado para fazer login: ', loginPerfil);
            switch (loginPerfil) {
                case 'recepcionista':
                    window.location.href = '/login/recepcionista';
                    break;
                case 'paciente':
                    window.location.href = '/user/login';
                    break;
                case 'professor':
                    window.location.href = '/login/professor';
                    break;
                case 'psicologo':
                    window.location.href = '/psico/login';
                    break;
                case 'gestor':
                    window.location.href = '/login/gestor';
                    break;
                default:
                    break;
            }
        }
    });
});
