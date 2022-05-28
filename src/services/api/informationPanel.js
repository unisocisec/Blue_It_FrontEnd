/* eslint-disable no-throw-literal */
import axios from 'axios';

import { BaseUrl } from '../../providers/_config';
import { getTokenParameters } from '../../providers/sessionStorage';
import { extractMessage } from '../../components/notification';


const getPatientInformation = async (context) => {
  context.setLoading(true);
  try {
    const GameToken = getTokenParameters('gameToken');
    const result = await axios.get(`${BaseUrl}/pacients/${context.patientId}`, { headers: { GameToken } });
    return result.data.data;
  } catch (error) {
    context.addNotification('error', extractMessage(error, ''));
    throw 'erro';
  } finally {
    context.setLoading(false);
  }
}

export {
  getPatientInformation,
};
