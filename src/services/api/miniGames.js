import axios from 'axios';

import { BaseUrl } from '../../providers/_config';
import { getTokenParameters } from '../../providers/sessionStorage';

import { extractMessage } from '../../components/notification';

const getGeneralStatisticsDataFromTheMiniGame = async (context, filters, historyCalibration) => {
  context.setLoading(true);
  try {
    const GameToken = getTokenParameters('gameToken');
    const result = await axios.get(`${BaseUrl}/pacients/${context.patientId}/minigames`,
      { params: { sort: 'asc', ...filters }, headers: { GameToken } }
    );


    //     if (d.data.length == 0) {
    //       document.getElementById('plot-info').style.display = "";
    //       document.getElementById('minigame-chart-container').style.display = "none";

    //       $('#main-content').unblock();
    //       return;
    //   }
    //   document.getElementById('plot-info').style.display = "none";
    //   document.getElementById('minigame-chart-container').style.display = "";

    //   let objValues = d.data.map(function (value) {
    //       let obj = {}
    //       obj.date = new Date(value.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
    //       obj.flowValue = value.flowDataRounds.map(x => x.roundFlowScore).sort((a, b) => b - a)[0];
    //       return obj;
    //   });

    //   let groupObjValues = groupByDate(objValues);
    //   let values = Object.values(groupObjValues);
    //   let dates = Object.keys(groupObjValues);

    //   dates = dates.map(x => x.split("/"));                //converte para o formato UTC, timestamp
    //   dates = dates.map(x => Date.UTC(x[2],x[1] - 1, x[0]));

    //   debugger;
    //   for(let i=0; i<dates.length; i++){
    //       values[i]=[dates[i],values[i]];
    //   }
    //   let title = 'Pico Expiratório minigame';
    //   let Xtitle = 'pico Expiratório';
    //   if($('#minigame-name').val()=="WaterGame"){
    //       title = 'Pico Inspiratório minigame'; 
    //       Xtitle = 'pico Inspiratório';
    //   };


    // if( $('#HistoryCalibration').val()=="includeHistoryCalibration"){
    // $.ajax({
    //   url: `${window.API_ENDPOINT}/pacients/${userId}/calibrations`,
    //   type: "GET",
    //   dataType: "json",
    //   data: filters,
    //   beforeSend: function (rcalib) {
    //       rcalib.setRequestHeader("GameToken", getSessionUserCredentialValue('gameToken'));
    //   },
    //   success: function (dcalib) {

    //       let calibrationchoice=[];
    //       if($('#minigame-name').val()=="CakeGame"){
    //           calibrationchoice=dcalib.data.filter(x => x.calibrationExercise =="ExpiratoryPeak");
    //       }else{
    //           calibrationchoice=dcalib.data.filter(x => x.calibrationExercise =="InspiratoryPeak");
    //       };
    //       calibrationchoice.sort((a, b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0))

    //       let DataCalibration = { dataCalib: [], valuesCalib: []}


    //       calibrationchoice.map(function (element) {

    //           DataCalibration.dataCalib.push(new Date(element.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' }));
    //           DataCalibration.valuesCalib.push(element.calibrationValue);
    //       });

    //       DataCalibration.dataCalib = DataCalibration.dataCalib.map(x => x.split("/"));                //converte para o formato UTC, timestamp
    //       DataCalibration.dataCalib = DataCalibration.dataCalib.map(x => Date.UTC(x[2],x[1] - 1, x[0]));


    //       let newdates = [];
    //       Array.prototype.push.apply(newdates, DataCalibration.dataCalib);
    //       Array.prototype.push.apply(newdates, dates);
    //       newdates.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
    //       debugger;

    //      let Poligono100Calib = [];
    //      let Poligono75Calib = [];
    //      let Poligono50Calib = [];

    //      Poligono100Calib[0]= [(DataCalibration.dataCalib[0]), 0];
    //      Poligono75Calib[0]= [(DataCalibration.dataCalib[0]), 0];
    //      Poligono50Calib[0]= [(DataCalibration.dataCalib[0]), 0];
    //      for(let i=0;i<DataCalibration.dataCalib.length;i++){
    //          Poligono100Calib[i+1]= [DataCalibration.dataCalib[i], DataCalibration.valuesCalib[i]];
    //          Poligono75Calib[i+1]= [DataCalibration.dataCalib[i], 0.75*DataCalibration.valuesCalib[i]];
    //          Poligono50Calib[i+1]= [DataCalibration.dataCalib[i], 0.5*DataCalibration.valuesCalib[i]];
    //      };
    //      Poligono100Calib[DataCalibration.dataCalib.length+1]=[(DataCalibration.dataCalib[DataCalibration.dataCalib.length-1]), 0];
    //      Poligono75Calib[DataCalibration.dataCalib.length+1]=[(DataCalibration.dataCalib[DataCalibration.dataCalib.length-1]), 0];
    //      Poligono50Calib[DataCalibration.dataCalib.length+1]=[(DataCalibration.dataCalib[DataCalibration.dataCalib.length-1]), 0];



    //   //    basica mente un frafico que deve mostar o meni index pelo que entendi verifivar com o profesor

    //   let objValues = d.data.map(function (value) {
    //       let obj = {}
    //       obj.date = new Date(value.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
    //       obj.flowValue = value.flowDataRounds.map(x => x.roundFlowScore).sort((a, b) => b - a)[0];
    //       return obj;
    //   });

    //   let groupObjValues = groupByDate(objValues);
    //   let values = Object.values(groupObjValues);
    //   let dates = Object.keys(groupObjValues);


    //      let plotObj = {
    //       dates: newdates,
    //       values: values,
    //       Poligono100Calib: Poligono100Calib,
    //       Poligono75Calib: Poligono75Calib,
    //       Poligono50Calib: Poligono50Calib,
    //       title:title,
    //       Xtitle:Xtitle,
    //   }

    // debugger;

    //       $('#main-content').unblock();
    //       plot2(plotObj);


    //   },error: function () {
    //       $('#main-content').unblock();
    //       alert("Ocorreu um erro ao carregar os dados. Reinicie a página e tente novamente"); //alerta de erro
    //   },
    // });
    // }else{ //caso não seja desejado ver com o histórico de calibração, apresenta apenas o gráfico normal


    // let plotObj = {
    //   dates:dates,
    //   values: values,
    //   title:title,
    //   Xtitle:Xtitle,
    // }

    // $('#main-content').unblock();
    // plot(plotObj);
    // }

    // },
    // error: function () {
    //   $('#main-content').unblock();
    //   alert("Ocorreu um erro ao carregar os dados. Reinicie a página e tente novamente"); //alerta de erro
    // },

  } catch (error) {
    context.addNotification('error', extractMessage(error, ''));
    throw 'erro';
  } finally {
    context.setLoading(false);
  }
}

export {
  getGeneralStatisticsDataFromTheMiniGame,
};