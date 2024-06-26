function verificarUser(results, message, token){
    if(results.length>0){
        console.log('Token: ', token);
        console.log('idUser: ', results[0].idUser);
         // Salvar o token no localStorage:
         localStorage.setItem('token', token);

         // Salvar o idUser no localStorage:
         localStorage.setItem('idUser', results[0].idUser);

         //salvar perfil do usuário 
         localStorage.setItem('perfil', results[0].perfil);
        
         window.location.href = '/user/principal'

    }
    else{
        alert(message + '\n\nVerifique o e-mail ou senha digitados e tente novamente.');

    }
}