/* eslint-disable no-throw-literal */
import axios from 'axios';

import { BaseUrl } from '../../providers/_config';
import { getTokenParameters } from '../../providers/sessionStorage';
import { extractMessage } from '../../components/notification';

const getPlatformComparative = async (context, filters, visualization) => {
  context.setLoading(true);
  try {
    const GameToken = getTokenParameters('gameToken');
    const comparativePlatform = await axios.get(`${BaseUrl}/plataforms/statistics`,
      { params: { ...filters }, headers: { GameToken } }
    );


    //     let flowData = { insFlows: {}, expFlows: {}, score: {}, scoreRatio: {} };
    //     let currentPacientId = getCurrentPacient("_id");

    //     let flowDataSelectedPacient = d.data.filter(x => x.pacientId == currentPacientId);
    //     flowDataSelectedPacient[0].maxFlowsPerSession.sort((a, b) => (a.sessionNumber > b.sessionNumber) ? 1 : ((b.sessionNumber > a.sessionNumber) ? -1 : 0))


    //     let flowDataPacients = d.data.filter(x => x.pacientId != currentPacientId);

    //     flowDataPacients.forEach(element => {
    //         element.maxFlowsPerSession.sort((a, b) => (a.sessionNumber > b.sessionNumber) ? 1 : ((b.sessionNumber > a.sessionNumber) ? -1 : 0));
    //     });

    //     let flowDataPac = { sessoes: flowDataSelectedPacient[0].maxFlowsPerSession.length, insFlows: [], expFlows: [], Score: [], ScoreRatio: [] };

    //     flowDataPacients.map(function (element) {
    //         for (let index = 0; index < element.maxFlowsPerSession.length; index++) {
    //             if (flowData.expFlows[index] == undefined) {
    //                 flowData.expFlows[index] = [];
    //             }
    //             if (flowData.insFlows[index] == undefined) {
    //                 flowData.insFlows[index] = [];
    //             }

    //             flowData.expFlows[index].push(element.maxFlowsPerSession[index].maxExpFlow);
    //             flowData.insFlows[index].push(element.maxFlowsPerSession[index].maxInsFlow);
    //         };

    //         flowData.score = element.plataformInfo.map(x => ({ fase: x.phase, level: x.level, value: x.maxScore }));
    //         flowData.scoreRatio = element.plataformInfo.map(x => ({ fase: x.phase, level: x.level, value: x.scoreRatio }));
    //     });

    //     if(flowData.score[0]==undefined){flowData.score=[];};
    //     //DADO FAKE COMPARATIVO SCORE
    //     //for(let i=0;i<30;i++){

    //      //   flowData.score.push({ fase: Math.floor((Math.random() * 3) + 1), level: Math.floor((Math.random() * 9) + 1), value: Math.floor((Math.random() * 1500) + 1)});
    //    // } //usando random para gerar dados aleatórios de fase, sessão e pontuação para comparação com o paciente analisado
    //     //fim dados fake

    //     if(flowData.scoreRatio[0]==undefined){flowData.scoreRatio=[];};
    //     //DADO FAKE COMPARATIVO RAZÂO
    //     //for(let i=0;i<30;i++){

    //    //     flowData.scoreRatio.push({ fase: Math.floor((Math.random() * 3) + 1), level: Math.floor((Math.random() * 9) + 1), value: Math.floor((Math.random() * 100))});
    //    // } //usando random para gerar dados aleatórios de fase, sessão e pontuação para comparação com o paciente analisado
    //     //fim dados fake


    //     for (let index = 0; index < flowDataSelectedPacient[0].maxFlowsPerSession.length; index++) {
    //         flowDataPac.expFlows.push(flowDataSelectedPacient[0].maxFlowsPerSession[index].maxExpFlow);
    //         flowDataPac.insFlows.push(flowDataSelectedPacient[0].maxFlowsPerSession[index].maxInsFlow);


    //         for(let i=1; i<=3;i++){
    //             if(flowDataSelectedPacient[0].plataformInfo[index].phase==i){
    //                 for(let j=1;j<=9;j++){
    //                     if(flowDataSelectedPacient[0].plataformInfo[index].level==j){
    //                         let a = (9 * (i - 1)) + (j - 1);
    //                         if(flowDataPac.Score[a]==undefined || flowDataPac.Score[a] ==""){flowDataPac.Score[a]=0;};
    //                         if(flowDataPac.Score[a]<flowDataSelectedPacient[0].plataformInfo[index].maxScore){
    //                             flowDataPac.Score[a]=flowDataSelectedPacient[0].plataformInfo[index].maxScore;
    //                         }
    //                         if(flowDataPac.ScoreRatio[a]==undefined || flowDataPac.ScoreRatio[a] ==""){flowDataPac.ScoreRatio[a]=0;};
    //                         if(flowDataPac.ScoreRatio[a]<100*flowDataSelectedPacient[0].plataformInfo[index].scoreRatio){
    //                             flowDataPac.ScoreRatio[a]=100*flowDataSelectedPacient[0].plataformInfo[index].scoreRatio;
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //     }


    //     //alocando vetores com todos os dados separando por fase e por level, e então retirando a mediana destes valores
    //     let somascore = [];
    //     let scoreMediana =[];
    //     flowData.score.map(function (element) {
    //         for(let i=1; i<=3;i++){
    //             if(element.fase==i){
    //                 for(let j=1;j<=9;j++){
    //                     if(element.level==j){
    //                         let a = (9 * (i - 1)) + (j - 1);
    //                             if (somascore[a] == undefined || somascore[a] == "") {
    //                                 somascore[a] = [];
    //                                 somascore[a].push(element.value);
    //                             }else{
    //                                 somascore[a].push(element.value);
    //                             }
    //                             if (scoreMediana[a] == undefined || scoreMediana[a] == "") {
    //                                 scoreMediana[a] = 0;
    //                             }
    //                         scoreMediana[a]=quartile(somascore[a], .50);
    //                     }
    //                 }
    //             }
    //         }
    //     });


    //     //como podem haver levels se dado algum (embora se espera que não aconteça), isso irá alocar valores nulos nessas posições dos
    //     //vetores, para que o highchart não plote os dados em posições erradas, e assim também limitando a apresentação do comparativo
    //     //ao tamanho dos dados do paciente.
    //     let scoreMedianautil=[];
    //     for(let a=0;a<flowDataPac.Score.length;a++){
    //         if (scoreMediana[a] == undefined || scoreMediana[a] == "") {
    //          scoreMedianautil[a] = "";
    //          }else{
    //          scoreMedianautil[a]=scoreMediana[a];
    //         }
    //     }


    //     //alocando vetores com todos os dados separando por fase e por level, e então retirando a mediana destes valores
    //     let somascoreRatio = [];
    //     let scoreRatioMediana =[];
    //     flowData.scoreRatio.map(function (element) {
    //         for(let i=1; i<=3;i++){
    //             if(element.fase==i){
    //                 for(let j=1;j<=9;j++){
    //                     if(element.level==j){
    //                         let a = (9 * (i - 1)) + (j - 1);
    //                             if (somascoreRatio[a] == undefined || somascoreRatio[a] == "") {
    //                                 somascoreRatio[a] = [];
    //                                 somascoreRatio[a].push(element.value);
    //                             }else{
    //                                 somascoreRatio[a].push(element.value);
    //                             }
    //                             if (scoreRatioMediana[a] == undefined || scoreRatioMediana[a] == "") {
    //                                 scoreRatioMediana[a] = 0;
    //                             }
    //                         scoreRatioMediana[a]=quartile(somascoreRatio[a], .50);
    //                     }
    //                 }
    //             }
    //         }
    //     });

    //     //for(let i=0;i<5;i++){
    //     //flowDataPac.ScoreRatio.push((Math.random() * 100));}      //DADO FAKE PACIENTE RAZÂO


    //     //como podem haver levels se dado algum (embora se espera que não aconteça), isso irá alocar valores nulos nessas posições dos
    //     //vetores, para que o highchart não plote os dados em posições erradas, e assim também limitando a apresentação do comparativo
    //     //ao tamanho dos dados do paciente.
    //     let scoreRatioMedianautil=[];
    //     for(let a=0;a<flowDataPac.ScoreRatio.length;a++){
    //         if (scoreRatioMediana[a] == undefined || scoreRatioMediana[a] == "") {
    //          scoreRatioMedianautil[a] = "";
    //          }else{
    //          scoreRatioMedianautil[a]=scoreRatioMediana[a];
    //         }
    //     }



    //     let quartilSuperiorExp = [];
    //     let quartilInferiorExp = [];
    //     let quartilSuperiorIns = [];
    //     let quartilInferiorIns = [];
    //     for (const [key, value] of Object.entries(flowData.expFlows)) {
    //         value.sort(function (a, b) { return a - b; });
    //         quartilSuperiorExp.push(quartile(value, .75));
    //         quartilInferiorExp.push(quartile(value, .25));
    //     }

    //     for (const [key, value] of Object.entries(flowData.insFlows)) {
    //         value.sort(function (a, b) { return a - b; });
    //         quartilSuperiorIns.push(quartile(value, .75));
    //         quartilInferiorIns.push(quartile(value, .25));
    //     }

    //     for (let i = 1; i < quartilSuperiorExp.length - 1; i++) {
    //         if (quartilSuperiorExp[i] == undefined && quartilSuperiorExp[i - 1] != undefined && quartilSuperiorExp[i + 1] != undefined) {
    //             quartilSuperiorExp[i] = quartilSuperiorExp[i - 1] + quartilSuperiorExp[i + 1];
    //         };
    //     };
    //     for (let i = 1; i < quartilInferiorExp.length - 1; i++) {
    //         if (quartilInferiorExp[i] == undefined && quartilInferiorExp[i - 1] != undefined && quartilInferiorExp[i + 1] != undefined) {
    //             quartilInferiorExp[i] = quartilInferiorExp[i - 1] + quartilInferiorExp[i + 1];
    //         };
    //     };

    //     for (let i = 1; i < quartilSuperiorIns.length - 1; i++) {
    //         if (quartilSuperiorIns[i] == undefined && quartilSuperiorIns[i - 1] != undefined && quartilSuperiorIns[i + 1] != undefined) {
    //             quartilSuperiorIns[i] = quartilSuperiorIns[i - 1] + quartilSuperiorIns[i + 1];
    //         };
    //     };
    //     for (let i = 1; i < quartilInferiorIns.length - 1; i++) {
    //         if (quartilInferiorIns[i] == undefined && quartilInferiorIns[i - 1] != undefined && quartilInferiorIns[i + 1] != undefined) {
    //             quartilInferiorIns[i] = quartilInferiorIns[i - 1] + quartilInferiorIns[i + 1];
    //         };
    //     };

    //     let areaRangeExpValues = [];
    //     let areaRangeInsValues = [];

    //     for (let i = 0; i < flowDataPac.sessoes; i++) {
    //         areaRangeExpValues[i] = [i + 1, quartilInferiorExp[i], quartilSuperiorExp[i]];
    //         areaRangeInsValues[i] = [i + 1, quartilInferiorIns[i], quartilSuperiorIns[i]];

    //     }

    //     let playerLineExpValues = [];
    //     let playerLineInsValues = [];

    //     for (let i = 0; i < flowDataPac.sessoes; i++) {
    //         playerLineExpValues[i] = [i + 1, flowDataPac.expFlows[i]];
    //         playerLineInsValues[i] = [i + 1, flowDataPac.insFlows[i]];
    //     }



    //     let plotObj = {};
    //     let maxscoredatautil = [];



    //     switch ($("#plataform-view").val()) {

    //         case 'expiratory_peak':
    //             plotObj = {
    //                 title: `Dados Comparativos - Picos Expiratórios`,
    //                 seriesLineName: 'Picos Expiratórios do paciente selecionado',
    //                 areaRange: areaRangeExpValues,
    //                 values: playerLineExpValues,
    //             };
    //             break;

    //         case 'inspiratory_peak':
    //             plotObj = {
    //                 title: `Dados Comparativos - Picos Inspiratórios`,
    //                 seriesLineName: 'Picos Inspiratórios do paciente selecionado',
    //                 areaRange: areaRangeExpValues,
    //                 values: playerLineInsValues,
    //             };
    //             break;

    //         case 'score':

    //             plotObj = {
    //                 title: `Dados Comparativos - Pontuação`,
    //                 seriesLineName: getCurrentPacient("name"),
    //                 scorecomp: scoreMedianautil,
    //                 values:flowDataPac.Score,
    //                 yTitleText: "Pontuação",
    //                 namecompmax: "Comparativo Pontuação Máxima",
    //                 pacientCompSerieName: "Pontuação Comum de Pacientes Selecionados",
    //                 yLabel: "Pontos",
    //                 maxyaxis: null,
    //                 passoy: null,
    //                 PosFlagY: 50,
    //             };
    //             for (let i = 0; i < plotObj.values.length; i++) {
    //                 maxscoredatautil[i] = Max_Score_Plataforma[i];
    //             }

    //             plotObj.maxscoredata = maxscoredatautil;
    //             break;

    //         case 'ratio':


    //             plotObj = {
    //                 title: `Dados Comparativos - Razão`,
    //                 seriesLineName: getCurrentPacient("name"),
    //                 scorecomp: scoreRatioMedianautil,
    //                 values: flowDataPac.ScoreRatio,
    //                 yTitleText: "Porcentagem (%)",
    //                 namecompmax: "Porcentagem máxima",
    //                 pacientCompSerieName: "Razão Comum de Pacientes Selecionados",
    //                 yLabel: "%",
    //                 maxyaxis: 100,
    //                 passoy: 25,
    //                 PosFlagY: 0,
    //             };
    //             for (let i = 0; i < plotObj.values.length; i++) {
    //                 maxscoredatautil[i] = 100;
    //             } //razão máxima é sempre o 100%

    //             plotObj.maxscoredata = maxscoredatautil;  //há necessidade de comparar com o máximo em Razão????
    //             break;


    //     }


    //     if ($("#plataform-view").val() == 'expiratory_peak' || $("#plataform-view").val() == 'inspiratory_peak') {

    //         switch ($("#device-name").val()) {

    //             case 'Pitaco':
    //                 plotObj.yAxisTitleText = "L/min";
    //                 plotObj.yLabel = "L/min";
    //                 break;
    //             case 'Mano':
    //                 plotObj.yAxisTitleText = "L/m³ ???";
    //                 plotObj.yLabel = "L/m³ ???";
    //                 break;
    //             case 'Cinta':
    //                 plotObj.yAxisTitleText = "cm ???"; ////VERIFICAR UNIDADES CORRETAS
    //                 plotObj.yLabel = "cm ???";
    //                 break;
    //         }

    //         plot(plotObj);
    //     }

    //     if ($("#plataform-view").val() == 'score' || $("#plataform-view").val() == 'ratio') {

    //         plotbar(plotObj);
    //     }
    // }
    // });

    return [];
  } catch (error) {
    context.addNotification('error', extractMessage(error, ''));
    throw 'erro';
  } finally {
    context.setLoading(false);
  }
}

export {
  getPlatformComparative
};