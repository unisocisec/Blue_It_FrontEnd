
import axios from 'axios';
// import errorMessage from '../components/errorMessage';

const url = "https://iblueit.azurewebsites.net/api/";

const postAuthentication = async (context, username, password) => {
  context.setLoading(true);
  try {
    const result = await axios.post(`${url}/login`, { username, password });
    sessionStorage.setItem('userCredentials', JSON.stringify(result.data.data));

  } catch (error) {
    // await errorMessage(error);
  } finally {
    context.setLoading(false);
  }
}


export {
  postAuthentication,
}
