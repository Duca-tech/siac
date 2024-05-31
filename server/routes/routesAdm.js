import express  from 'express';
import  {getDataAdm, addUser,loginUser,getPsico,getHorario,addHora, updateHorario,getUser,updateUser,deleteHorario,getAgenda, getHours,addAgenda,deleteAgenda,getPsicoAgenda,verificarConsulta,putStatusConsult} from '../helper/sql.js'
const routerAdm = express.Router();

var countJan = 0, countFev =0, countMarc=0, countMaio =0, countAbril =0, countJunho =0, countJulho =0, countAgo =0, countSet =0, countOut=0, countNov =0, countDez =0

var countJanDisp = 0, countFevDisp =0, countMarcDisp=0, countMaioDisp =0, countAbrilDisp =0, countJunhoDisp =0, countJulhoDisp =0, countAgoDisp =0, countSetDisp =0, countOutDisp=0, countNovDisp =0, countDezDisp =0

const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

let perfilAdm =0, perfilPsico =0, perfilPac =0, perfilRecep =0;

routerAdm.get('/dash', (req,res)=>{
    countJan = 0, countFev =0, countMarc=0, countMaio =0, countAbril =0, countJunho =0, countJulho =0, countAgo =0, countSet =0, countOut=0, countNov =0, countDez =0
    countJanDisp = 0, countFevDisp =0, countMarcDisp=0, countMaioDisp =0, countAbrilDisp =0, countJunhoDisp =0, countJulhoDisp =0, countAgoDisp =0, countSetDisp =0, countOutDisp=0, countNovDisp =0, countDezDisp =0
    perfilAdm =0, perfilPsico =0, perfilPac =0, perfilRecep =0
    
    console.log('idUser: ', req.session.userId);
    getDataAdm((error,results, results2, results3)=>{
        console.log('results2: ', results2)
        results2.map(element=>{
            contarPerfis(element.perfil);
        })
        results.map(element=>{
            formatarData(element);
            // console.log(element.hora);
        });
        results3.map(element=>{

        })
        // arrayDia = removeDuplicatesFromNestedArray(arrayDia);
        // arrayMes = removeDuplicatesFromNestedArray(arrayMes);
        // console.log('count',countMaio,  countJunho)
        
        
        // arrayMes = arrayIntParaString(arrayMes);
        

        // console.log('dia: ', Arraydia)
        // console.log('mes: ', Arraymes);

        const dataDispZero = {
            labels: meses,
            datasets: [{
                label: 'Consultas',
                data: [countJan, countFev, countMarc, countAbril, countMaio, countJunho, countJulho, countAgo, countSet, countOut, countNov, countDez],
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };
        const dataDispUm = {
            labels: meses,
            datasets: [{
                label: 'Consultas',
                data: [countJanDisp, countFevDisp, countMarcDisp, countAbrilDisp, countMaioDisp, countJunhoDisp, countJulhoDisp, countAgoDisp, countSetDisp, countOutDisp, countNovDisp, countDezDisp],
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        const perfilUser ={
            labels: ['Paciente', 'psicologo', 'Recepcionista'],
            datasets: [{
                label: 'Usuários',
                data: [perfilPac, perfilPsico, perfilRecep],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        }

        const countAgPsico =
        
        res.json({dataDispZero:dataDispZero, dataDispUm:dataDispUm, perfilUser: perfilUser});
    })
    
})

function formatarData(element){
    var data = new Date(element.data);
    var mes = data.getUTCMonth() + 1;
    var dia = data.getUTCDate();
    
    
    
    
}

function count(disponibilidade, mes){

    if(disponibilidade == 0){
        if (mes == 1){
            countJan++;
           }
           if (mes == 2){
            countFev++;
           }
           if (mes == 3){
            countMarc++;
           }
           if (mes == 4){
            countAbril++;
           }
           if (mes == 5){
            countMaio++;
           }
           if (mes == 6){
            countJunho++;
           }
           if (mes == 7){
            countJulho++;
           }
           if (mes == 8){
            countAgo++;
           }
           if (mes == 9){
            countSet++;
           }
           if (mes == 10){
            countOut++;
           }
           if (mes == 11){
            countNov++;
           }
           if (mes == 12){
            countDez++;
           }
           
       }
       else{
        if (mes == 1){
            countJanDisp++;
           }
           if (mes == 2){
            countFevDisp++;
           }
           if (mes == 3){
            countMarcDisp++;
           }
           if (mes == 4){
            countAbrilDisp++;
           }
           if (mes == 5){
            countMaioDisp++;
           }
           if (mes == 6){
            countJunhoDisp++;
           }
           if (mes == 7){
            countJulhoDisp++;
           }
           if (mes == 8){
            countAgoDisp++;
           }
           if (mes == 9){
            countSetDisp++;
           }
           if (mes == 10){
            countOutDisp++;
           }
           if (mes == 11){
            countNovDisp++;
           }
           if (mes == 12){
            countDezDisp++;
           }
           
       }
}


// function removeDuplicatesFromNestedArray(arr) {
//     return [...new Set(arr)];
    
//   }

function contarPerfis(perfil){
    if(perfil =='administrador'){
        perfilAdm++;
    }
    if(perfil == 'psicologo'){
        perfilPsico++;
    }
    if(perfil == 'paciente'){
        perfilPac++;
    }
    if(perfil =='recepcionista'){
        perfilRecep++;
    }
}

export {
    routerAdm
}