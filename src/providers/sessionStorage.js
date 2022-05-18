const saveAuthenticationData = (dataOfRequest, context) => {
  const dataToSave = (dataOfRequest.data && dataOfRequest.data.data)
    ? JSON.stringify(dataOfRequest.data.data)
    : '';
  context.setGameToken(dataToSave.gameToken)
  sessionStorage.setItem('userCredentials', dataToSave);
}

const isAuthenticated = () => {
  const storedUserCredentials = sessionStorage.getItem('userCredentials');
  const userCredentials = (storedUserCredentials)
    ? JSON.parse(storedUserCredentials)
    : undefined;

  if (!storedUserCredentials || !userCredentials) return false;
  if (!validateUserCredentials(userCredentials)) return false;
  return true;
}

const validateUserCredentials = (userCredentials) => {
  const keysNeeded = ['fullname', 'gameToken', 'userId', 'authExpirationTime', 'authTime'];
  const keys = Object.keys(userCredentials);
  return keysNeeded.every(elem => keys.indexOf(elem) >= 0);
}

const removerAuthenticationData = () => {
  sessionStorage.clear();
}

export {
  saveAuthenticationData,
  removerAuthenticationData,
  isAuthenticated
}
