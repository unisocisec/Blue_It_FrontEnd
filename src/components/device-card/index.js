import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeviceCardHeader from "./header";
import MeasureBox from "./measure-box";

const DeviceCard = ({ historyCalibration }) => {
  return (
    <Paper
      sx={{
        flex: 'auto',
        boxSizing: 'border-box',
        minWidth: 0,
        maxWidth: 600,
        backgroundColor: "white",
        color: "black",
        marginBottom: 5,
      }}
      elevation={24}
    >
      <DeviceCardHeader title={historyCalibration.name ? historyCalibration.name : 'Sem Nome'} />
      <Box sx={{ display: 'flex', flexFlow: 'wrap' }}>
        <MeasureBox
          isLeft={true}
          title='Pico expiratório'
          value={`${historyCalibration.respiratoryRate ? historyCalibration.expPeakFlow.toFixed(0) : ''} L/min`}
        />
        <MeasureBox
          isLeft={false}
          title='Duração Expiratória'
          value={`${historyCalibration.expFlowDuration ? historyCalibration.expFlowDuration.toFixed(0) : ''} seg`}
        />
        <MeasureBox
          isLeft={true}
          title='Pico Inspiratório:'
          value={`${historyCalibration.insPeakFlow ? historyCalibration.insPeakFlow.toFixed(0) : ''} L/min`}
        />
        <MeasureBox
          isLeft={false}
          title='Duração Inspiratória'
          value={`${historyCalibration.insFlowDuration ? historyCalibration.insFlowDuration.toFixed(0) : ''} seg`}
        />
        <MeasureBox
          isLeft={true}
          title='Frequência'
          value={`${historyCalibration.respiratoryRate ? historyCalibration.respiratoryRate.toFixed(2) : ''} RPM`}
        />
      </Box>
    </Paper>
  );
};

export default DeviceCard;
