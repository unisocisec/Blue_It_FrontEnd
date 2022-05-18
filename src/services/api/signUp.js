import axios from 'axios';

import { extractMessage } from '../../components/notification';


const requestRegisterUsers = async (context, userData) => {
  context.setLoading(true);
  try {
    const result = await axios.post(`${window.BaseUrl}/register`, userData);
    context.addNotification('success', extractMessage(result, ''));
  } catch (error) {
    context.addNotification('error', extractMessage(error, ''));
    throw 'erro';
  } finally {
    context.setLoading(false);
  }
}

export {
  requestRegisterUsers,
};
