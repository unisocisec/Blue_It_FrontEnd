import axios from 'axios';
import moment from "moment";

import { BaseUrl } from '../../providers/_config';
import { getTokenParameters } from '../../providers/sessionStorage';
import { extractMessage } from '../../components/notification';


const getGeneralStatisticsDataFromTheMiniGame = async (context, filters, typeGraph) => {
  context.setLoading(true);
  try {
    const GameToken = getTokenParameters('gameToken');
    const resultMiniGames = await axios.get(`${BaseUrl}/pacients/${context.patientId}/minigames`,
      { params: { sort: 'asc', ...filters }, headers: { GameToken } }
    );
    const sessionData = resultMiniGames.data.data.sort((first, second) => second.created_at - first.created_at);
    const tempGraphData = {};
    const graphData = [];

    for (const element of sessionData) {
      const flowValue = element.flowDataRounds.sort((first, second) => second.roundFlowScore - first.roundFlowScore)[0].roundFlowScore;
      if (tempGraphData[moment(element.created_at).format("L")]) {
        tempGraphData[moment(element.created_at).format("L")] = (flowValue > tempGraphData[moment(element.created_at).format("L")])
          ? { flowValue }
          : { flowValue: tempGraphData[moment(element.created_at).format("L")] };
      } else {
        tempGraphData[moment(element.created_at).format("L")] = { flowValue };
      }
    }

    if (typeGraph) {
      const resultCalibrations = await axios.get(`${BaseUrl}/pacients/${context.patientId}/calibrations`,
        { params: { sort: 'asc', ...filters }, headers: { GameToken } }
      );
      const calibrationsData = resultCalibrations.data.data;
      const typeFilter = (filters.minigameName === 'CakeGame') ? 'ExpiratoryPeak' : 'InspiratoryPeak';
      const tempCalibrationsData = calibrationsData.filter(elem => elem.calibrationExercise === typeFilter);
      tempCalibrationsData.sort((first, second) => first.calibrationValue - second.calibrationValue);

      for (const element of tempCalibrationsData) {
        if (tempGraphData[moment(element.created_at).format("L")]) {
          tempGraphData[moment(element.created_at).format("L")] = {
            ...tempGraphData[moment(element.created_at).format("L")],
            calibration_100: element.calibrationValue,
            calibration_50: 0.75 * Number(element.calibrationValue),
            calibration_25: 0.5 * Number(element.calibrationValue),
          }
        } else {
          tempGraphData[moment(element.created_at).format("L")] = {
            calibration_100: element.calibrationValue,
            calibration_50: 0.75 * element.calibrationValue,
            calibration_25: 0.5 * element.calibrationValue,
          };
        }
      }
    }

    for (const key in tempGraphData) {
      graphData.push({
        sessionDate: key,
        flowValue: tempGraphData[key].flowValue,
        ...(typeGraph) ? {
          calibration_100: tempGraphData[key].calibration_100,
          calibration_50: tempGraphData[key].calibration_50,
          calibration_25: tempGraphData[key].calibration_25,
        } : {}
      })
    }

    return graphData;
  } catch (error) {
    context.addNotification('error', extractMessage(error, ''));
    throw 'erro';
  } finally {
    context.setLoading(false);
  }
}

const getMiniGameComparative = async (context, filters) => {
  context.setLoading(true);
  try {
    const GameToken = getTokenParameters('gameToken');
    const comparativeMiniGames = await axios.get(`${BaseUrl}/minigames/statistics`,
      { params: { ...filters }, headers: { GameToken } }
    );

    // let flowData = { flows: {} };
    // let flowDataSelectedPacient = d.data.filter(x => x.pacientId == getCurrentPacient("_id"));
    // flowDataSelectedPacient[0].maxFlows.sort((a, b) => (a.sessionNumber > b.sessionNumber) ? 1 : ((b.sessionNumber > a.sessionNumber) ? -1 : 0))

    // let currentPacientId = getCurrentPacient("_id");
    // let flowDataPacients = d.data.filter(x => x.pacientId != currentPacientId);

    // flowDataPacients.forEach(element => {
    //   element.maxFlows.sort((a, b) => (a.sessionNumber > b.sessionNumber) ? 1 : ((b.sessionNumber > a.sessionNumber) ? -1 : 0));
    // });

    // let flowDataPac = { sessoes: flowDataSelectedPacient[0].maxFlows.length, flows: [] };

    // flowDataPacients.map(function (element) {
    //   for (let index = 0; index < element.maxFlows.length; index++) {
    //     if (flowData.flows[index] == undefined)
    //       flowData.flows[index] = [];

    //     flowData.flows[index].push(element.maxFlows[index].flow);
    //   }
    // });

    // for (let index = 0; index < flowDataSelectedPacient[0].maxFlows.length; index++) {
    //   flowDataPac.flows.push(flowDataSelectedPacient[0].maxFlows[index].flow);
    // }

    // let quartilSuperiorExp = [];
    // let quartilInferiorExp = [];

    // for (const [key, value] of Object.entries(flowData.flows)) {
    //   value.sort(function (a, b) { return a - b; });
    //   quartilSuperiorExp.push(quantile(value, .75));
    //   quartilInferiorExp.push(quantile(value, .25));
    // }

    // for (let i = 1; i < quartilSuperiorExp.length - 1; i++) {
    //   if (quartilSuperiorExp[i] == undefined && quartilSuperiorExp[i - 1] != undefined && quartilSuperiorExp[i + 1] != undefined) {
    //     quartilSuperiorExp[i] = quartilSuperiorExp[i - 1] + quartilSuperiorExp[i + 1];
    //   };
    // };
    // for (let i = 1; i < quartilInferiorExp.length - 1; i++) {
    //   if (quartilInferiorExp[i] == undefined && quartilInferiorExp[i - 1] != undefined && quartilInferiorExp[i + 1] != undefined) {
    //     quartilInferiorExp[i] = quartilInferiorExp[i - 1] + quartilInferiorExp[i + 1];
    //   };
    // };

    // let areaRangeValues = [];
    // for (let i = 0; i < flowDataPac.sessoes; i++) {
    //   areaRangeValues[i] = [i + 1, quartilInferiorExp[i], quartilSuperiorExp[i]];
    // }

    // let playerLineValues = [];
    // for (let i = 0; i < flowDataPac.sessoes; i++) {
    //   playerLineValues[i] = [i + 1, flowDataPac.flows[i]];
    // }

    // let plotObj = {
    //   title: `Dados Comparativos - Minigame [${$("#minigame-name").val() === "CakeGame" ? "Velas no Bolo" : "Copo D'Água"}]`,
    //   yAxisTitleText: $("#minigame-name").val() === "CakeGame" ? "Pico Expiratório (L/min)" : "Pico Inspiratório (L/min)",
    //   seriesLineName: 'Picos Expiratórios do paciente selecionado',
    //   areaRange: areaRangeValues,
    //   lineData: playerLineValues
    // }

    return [];
  } catch (error) {
    context.addNotification('error', extractMessage(error, ''));
    throw 'erro';
  } finally {
    context.setLoading(false);
  }
}

export {
  getGeneralStatisticsDataFromTheMiniGame,
  getMiniGameComparative,
};