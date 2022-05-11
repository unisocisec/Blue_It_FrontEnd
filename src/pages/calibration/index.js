import React from "react";
import { Box, Typography } from "@mui/material";
import CalibrationCard from "../../components/calibration-card";

const CalibrationPage = () => {
  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant='h2' sx={{fontSize: 20}}>Histórico de calibrações</Typography>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexFlow: "wrap",
        }}
      >
        <CalibrationCard />
        <CalibrationCard />
      </Box>
    </Box>
  );
};

export default CalibrationPage;
