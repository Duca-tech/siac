function exibirLista(data){
    var tabela = document.querySelector('#relatorioTable');
    var tbody = document.querySelector('#relatorioTable tbody');
    data.map(element=>{
        var tr = document.createElement('tr');
        tr.id = element.idUser;
        var tdnome = document.createElement('td');
        tdnome.append(element.nome); 
        tr.append(tdnome);
        tbody.append(tr);
    })
}
function prontuarioDetalheUser(){
    document.querySelectorAll('#relatorioTable tbody tr').forEach((row)=>{
        row.addEventListener('click', function(){
            console.log('linha id: ', row.id);
            window.location.href = `/psico/relatorio/detalhePaciente?idPac=${row.id}`;
        })
    })
}