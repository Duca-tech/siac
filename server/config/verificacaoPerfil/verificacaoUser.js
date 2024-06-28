var verificacaoUser = async (req,res, next) =>{
    var perfil = req.session.perfil;
    
    if(perfil == 'paciente' || perfil == 'administrador'){
        next();
    }
    else{
        res.render('/');
    }
}

export { verificacaoUser}