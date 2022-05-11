import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CalibrationCardHeader from "./header";
import CalibrationCardMeasureBox from "./measure-box";

const CalibrationCard = () => {
  return (
    <Paper
      sx={{
        flex: 'auto',
        boxSizing: 'border-box',
        //flex: 1,
        minWidth: 0,
        //,
        //width: "100%",
        maxWidth: 600,
        //minWidth: 700,
        backgroundColor: "white",
        //height: 300,
        color: "black",
        marginBottom: 5,
      }}
      elevation={24}
    >
      <CalibrationCardHeader />
      <Box sx={{display: 'flex', flexFlow: 'wrap'}}>
        <CalibrationCardMeasureBox title='Pico expiratório' isLeft={true} />
        <CalibrationCardMeasureBox title='Duração Expiratória' isLeft={false} />
        <CalibrationCardMeasureBox title='Pico Inspiratório:' isLeft={true} />
        <CalibrationCardMeasureBox title='Duração Inspiratória' isLeft={false} />
        <CalibrationCardMeasureBox title='Frequência' isLeft={true} />
      </Box>
    </Paper>
  );
};

export default CalibrationCard;
