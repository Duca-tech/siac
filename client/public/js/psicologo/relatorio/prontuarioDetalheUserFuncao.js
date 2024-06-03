import {formatarData, formatarHorario} from '/js/formatacao/funcao.js'
export function exibirHorarios(horarios){
    var tbody = document.querySelector('#relatorioTable tbody');
    horarios.map((element)=>{
        var tr = document.createElement('tr');
        var tdConsulta = document.createElement('td');
        tdConsulta.append(element.status);
        var tdHora = document.createElement('td');
        element.hora = formatarHorario(element.hora);
        tdHora.append(element.hora)
        var data = document.createElement('td');
        element.data = formatarData(element.data);
        data.append(element.data);
        tr.append(tdConsulta);
        tr.append(data);
        tr.append(tdHora);
        tbody.append(tr);
    })
}

export function exibirProntuario(data){

}