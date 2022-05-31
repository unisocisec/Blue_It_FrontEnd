/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts';
import Box from "@mui/material/Box";

const MiniGamesGraph = ({ data, tableLegend_X, tableLegend_Y, typeGraph }) => {
  const [calibration_100Hide, setCalibration_100Hide] = useState(false);
  const [calibration_50Hide, setCalibration_50Hide] = useState(false);
  const [calibration_25Hide, setCalibration_25Hide] = useState(false);

  useEffect(() => {
    if (!document.getElementsByClassName('recharts-legend-item legend-item-1').length) {
      setTimeout(() => setOnclickGraph(), 500);
    } else {
      setOnclickGraph();
    }
  }, [calibration_100Hide, calibration_50Hide, calibration_25Hide]);

  const setOnclickGraph = () => {
    if (document.getElementsByClassName('recharts-legend-item legend-item-1').length) {
      document.getElementsByClassName('recharts-legend-item legend-item-1')[0].onclick = () => setCalibration_100Hide(!calibration_100Hide)
    }
    if (document.getElementsByClassName('recharts-legend-item legend-item-2').length) {
      document.getElementsByClassName('recharts-legend-item legend-item-2')[0].onclick = () => setCalibration_50Hide(!calibration_50Hide)
    }
    if (document.getElementsByClassName('recharts-legend-item legend-item-3').length) {
      document.getElementsByClassName('recharts-legend-item legend-item-3')[0].onclick = () => setCalibration_25Hide(!calibration_25Hide)
    }
  }

  return (
    <Box sx={{ height: 500, overflow: "hidden" }} >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sessionDate" tickLine={false} />
          <YAxis label={{ value: tableLegend_Y, angle: -90, position: 'insideLeft', fill: 'black', opacity: 0.5 }} tickLine={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="flowValue" name={tableLegend_X} stroke="#11192A" activeDot={{ r: 8 }} />
          {typeGraph && (
            <>
              <Line type="monotone" dataKey="calibration_100" name='100% da calibração' stroke="rgb(64 75 217)" activeDot={{ r: 8 }} hide={calibration_100Hide} />
              <Line type="monotone" dataKey="calibration_50" name='75% da calibração' stroke="rgb(56 137 96)" activeDot={{ r: 8 }} hide={calibration_50Hide} />
              <Line type="monotone" dataKey="calibration_25" name='50% da calibração' stroke="rgb(169 15 15)" activeDot={{ r: 8 }} hide={calibration_25Hide} />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MiniGamesGraph;