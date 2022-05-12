import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeviceCardHeader from "./header";
import MeasureBox from "./measure-box";

const DeviceCard = ({historyCalibration}) => {
  console.log(historyCalibration)

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
      <DeviceCardHeader title={historyCalibration.name}/>
      <Box sx={{display: 'flex', flexFlow: 'wrap'}}>
        <MeasureBox title='Pico expiratório' value={`${historyCalibration.expPeakFlow.toFixed(0)} L/min`} isLeft={true} />
        <MeasureBox title='Duração Expiratória' value={`${historyCalibration.expFlowDuration.toFixed(0)} seg`} isLeft={false} />
        <MeasureBox title='Pico Inspiratório:' value={`${historyCalibration.insPeakFlow.toFixed(0)} L/min`} isLeft={true} />
        <MeasureBox title='Duração Inspiratória' value={`${historyCalibration.insFlowDuration.toFixed(0)} seg`} isLeft={false} />
        <MeasureBox title='Frequência' value={`${historyCalibration.respiratoryRate.toFixed(2)} RPM`} isLeft={true} />
      </Box>
    </Paper>
  );
};

export default DeviceCard;
