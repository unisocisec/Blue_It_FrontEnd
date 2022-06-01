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

export {
  getGeneralStatisticsDataFromTheMiniGame,
};