import React from 'react';
import Box from '@mui/material/Box';
import { useMyContext } from "../../providers/MyContext";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// const errorMessage = (dataOfRequest) => {
//   const erro = dataOfRequest && dataOfRequest.response && dataOfRequest.response.data && dataOfRequest.response.data.message;
//   let message = '';

//   if (!dataOfRequest) {
//     message = 'Erro ao conectar com servidor, tente mais tarde';
//   } else if (erro) {
//     message = erro;
//   }

//   return (
//     <Alert variant="filled" severity="error">
//       {message}
//     </Alert>
//   )
// }
// export default errorMessage;




const ErrorMessage = () => {
  const context = useMyContext();

  // d.shift()
  // settaimeye

  // Store.addNotification({

    return (
      <div style={{
        position: 'fixed',
        bottom: '0',
        right: '0',
        left: '0',
        top: '0',
      }}>
        < Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          // mt: '25vh',
        }}>
          <Stack sx={{ width: '30%' }} spacing={1}>
             {
             }
            <Alert variant="filled" severity="error">
              message
            </Alert>
            <Alert variant="filled" severity="error">
              message
            </Alert>
            <Alert variant="filled" severity="error">
              message
            </Alert>
          </Stack>
        </Box >
      </div >
    );
}

export default ErrorMessage;