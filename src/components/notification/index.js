import React from 'react';
import Box from '@mui/material/Box';
import { useMyContext } from "../../providers/MyContext";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export const extractMessage = (result, displayMessage) => {
  const messageErro = (result && result.response && result.response.data && result.response.data.message);
  const message = (result && result.data && result.data.message);

  if (!messageErro && !message) {
    return 'Impossível fazer conexão com o servidor por favor tente novamente mais tarde';
  } else if (displayMessage) {
    return displayMessage;
  } else if (message) {
    return message;
  }
  return messageErro;
}

const Notification = () => {
  const context = useMyContext();
  const notificationList = context.notification;
  const notification = [];

  for (const key in notificationList) {
    if (Object.keys(notificationList[key]).length) {
      notification.push(notificationList[key]);
    }
  }

  return (
    <div style={{
      position: 'fixed',
      marginTop: '1vh',
      zIndex: '9998',
      right: '0',
      left: '0',
      top: '0',
    }}>
      < Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Stack sx={{ width: '30%', minWidth: 390 }} spacing={1}>
          {notification.map((elem, index) => (
            <Alert key={index} variant="filled" severity={elem.type}>
              {elem.message}
            </Alert>
          ))}
        </Stack>
      </Box >
    </div >
  );
}

export default Notification;