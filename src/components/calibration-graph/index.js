import Box from "@mui/material/Box";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const demoUrl = "https://codesandbox.io/s/simple-area-chart-4ujxw";

const CalibrationGraph = ({unitMeasure, data}) => {
  return (
    <Box sx={{ height: 500, overflow: "hidden" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          //style={{backgroundColor: 'white'}}
        >
          <XAxis dataKey="name" />
          <YAxis tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#11192A" fill="#11192A" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CalibrationGraph;
