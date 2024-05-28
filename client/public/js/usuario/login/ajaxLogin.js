document.addEventListener('DOMContentLoaded', function () {
    // Fetch para tela de login:
    document.getElementById('formLogin').addEventListener('submit', function (event) {
        event.preventDefault();

        if(document.getElementById('emailUsuario').value.includes('@') && document.getElementById('emailUsuario').value.includes('.com')){

            const data = {
                emailUsuario: document.getElementById('emailUsuario').value,
                password: document.getElementById('password').value
            };

            

            fetch('http://localhost:3600/user/login', {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Erro na solicitação. Status: ' + response.status);
                }
                return response.json();
            })
            .then(function (response) {
                console.log('Resposta do servidor: ', response);
                
                verificarUser(response.results,response.message,response.token);
               

                
            })
            .catch(function (error) {
                console.error('Erro:', error);
            })
            .finally(function () {
                console.log('Requisição finalizada!');
            });
        }
        else{
            alert('A string não contém @ e .com');
        }
    });
    
});
