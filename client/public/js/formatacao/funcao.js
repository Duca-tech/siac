export function formatarData(data){
    console.log('data: ', data);
    
    var data = new Date(data);
    var ano = data.getFullYear();
    var mes = data.getMonth() +1;
    var dia = data.getDate();
   
    dia = (dia<10) ? '0' + dia : dia
    mes = (mes<10) ? '0' + mes : mes
    var dataForm = `${dia}/${mes}/${ano}`
    return dataForm;
    
}

export function formatarHorario(horario){
    const [hora, minuto] = horario.split(':');
        
    var horasForm = `${hora}:${minuto}`
        
    return horasForm;
}

export function convertDateFormat(dateString) {
    // console.log('data: ', dateString);
    
    var data = new Date(dateString);
    var year = data.getFullYear();
    var month = data.getMonth() +1;
    var day = data.getDate();
   
    day = (day<10) ? '0' + day : day
    month = (month<10) ? '0' + month : month
    return `${year}-${month}-${day}`;
}
