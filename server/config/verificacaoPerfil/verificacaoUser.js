var verificacaoUser = async (req,res, next) =>{
    var perfil = req.session.perfil;
    
    if(perfil == 'paciente' || perfil == 'administrador'){
        next();
    }
    else{
        res.redirect('/');
    }
}

var verificacaoPsico = async (req,res, next)=>{
    var perfil = req.session.perfil;

    if(perfil == 'psicologo'|| perfil == 'administrador'){
        next();
    }
    else{
        res.redirect('/');
    }
}

export { verificacaoUser,verificacaoPsico}