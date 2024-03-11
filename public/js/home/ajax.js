$(document).ready(function(){
    $('.perfil').on('click', function(){
        $('.containerLoginPerfil').empty();
        var perfil = $(this).data('perfil');
        console.log('Perfil clicado: ', perfil)
        $('.containerLoginPerfil').append(`<button class='btn btn-primary loginPerfil' data-perfil='${perfil}' >Login ${perfil}</button>`)
        $('.containerLoginPerfil').css({'display':'block'})
    })  

    $('.containerLoginPerfil').on('click', '.loginPerfil',  function(){   
        var loginPerfil = $(this).data('perfil');
        console.log('botão clicado para fazer login: ', loginPerfil);

        if(loginPerfil == 'recepcionista') return window.location.href = '/login/recepcionista'
        if(loginPerfil == 'paciente') return window.location.href = '/user/login'
        if(loginPerfil == 'professor') return window.location.href = '/login/professor'
        if(loginPerfil == 'psicologo') return window.location.href = '/psico/login'
        if(loginPerfil == 'gestor') return window.location.href = '/login/gestor'
    })
})