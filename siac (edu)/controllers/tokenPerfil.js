const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUser, getPerfil } = require('../models/userModel'); // Funções para obter usuário e o seu perfil

routerUser.post('/login', async (req, res) => {
    const { emailUsuario, password } = req.body;

    // Verifique se o usuário existe no banco de dados
    const user = await getUser(emailUsuario);
    if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado'});
    }

    // Verifique se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Senha incorreta'});
    }

    // Obtenha o perfil do usuário com base no idPerfil
    const userProfile = await getPerfil(user.idPerfil);

    // Defina as permissões com base no tipo de usuário
    let permissions = [];
    switch (userProfile.perfil) {
        case 'paciente':
            permissions = ['agendar_consulta', 'editar_conta'];
            break;
        case 'recepcionista':
            permissions = ['verificar_consultas_agendadas', 'editar_conta'];
            break;
        case 'psicologo':
            permissions = ['cadastro_agenda', 'verificar_consultas_agendadas', 'editar_conta'];
            break;
        case 'professor':
            permissions = ['gerar_relatorios', 'editar_conta'];
            break;
        case 'gestor':
            permissions = ['todas_as_permissoes'];
            break;
        default:
            break;
    }

    // Gerar token JWT com as permissões
    const token = jwt.sign({ id: user.idUsuario, perfil: userProfile.perfil, permissions }, 'segredo', { expiresIn: '1h' });

    res.json({ auth: true, token });
});
