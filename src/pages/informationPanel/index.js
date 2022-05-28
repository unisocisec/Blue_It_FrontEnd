import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useMyContext } from "../../providers/MyContext";


const InformationPanel = () => {
  const context = useMyContext();

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" sx={{ fontSize: 20 }} >
        Painel de Informações
      </Typography>
      <Container component="main" maxWidth="xs">
      </Container>
    </Box>
  );
}

export default InformationPanel;