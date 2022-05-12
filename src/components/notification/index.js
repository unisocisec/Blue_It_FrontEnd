import React from 'react';
import Box from '@mui/material/Box';
import { useMyContext } from "../../providers/MyContext";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export const extractMessage = (erro, displayMessage) => {
  const message = (erro && erro.response && erro.response.data && erro.response.data.message);
  if (!message) {
    return 'Impossível fazer conexão com o servidor por favor tente novamente mais tarde';
  } else if (displayMessage) {
    return displayMessage;
  }
  return message;
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
      right: '0',
      left: '0',
      top: '1',
    }}>
      < Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Stack sx={{ width: '30%' }} spacing={1}>
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