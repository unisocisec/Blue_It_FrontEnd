import React, { useState } from 'react';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';
import { Box } from "@mui/material";

const data = [{
  xAxisPosition: '1',
  expectedValues_A: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue: Math.floor(Math.random() * (280 - 270 + 1)) + 270
}, {
  xAxisPosition: '2',
  expectedValues_A: Math.floor(Math.random() * (270 - 260 + 1)) + 260,
  expectedValues_B: Math.floor(Math.random() * (170 - 160 + 1)) + 160,
  flowValue: Math.floor(Math.random() * (240 - 230 + 1)) + 230
}, {
  xAxisPosition: '3',
  expectedValues_A: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B: Math.floor(Math.random() * (160 - 150 + 1)) + 150,
  flowValue: Math.floor(Math.random() * (280 - 270 + 1)) + 270
}, {
  xAxisPosition: '4',
  expectedValues_A: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  flowValue: Math.floor(Math.random() * (210 - 200 + 1)) + 200
}, {
  xAxisPosition: '5',
  expectedValues_A: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue: Math.floor(Math.random() * (210 - 200 + 1)) + 200
}, {
  xAxisPosition: '6',
  expectedValues_A: Math.floor(Math.random() * (260 - 250 + 1)) + 250,
  expectedValues_B: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  flowValue: Math.floor(Math.random() * (240 - 230 + 1)) + 230
}, {
  xAxisPosition: '7',
  expectedValues_A: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B: Math.floor(Math.random() * (120 - 110 + 1)) + 110,
  flowValue: Math.floor(Math.random() * (230 - 220 + 1)) + 220
}, {
  xAxisPosition: '8',
  expectedValues_A: Math.floor(Math.random() * (270 - 260 + 1)) + 260,
  expectedValues_B: Math.floor(Math.random() * (120 - 110 + 1)) + 110,
  flowValue: Math.floor(Math.random() * (220 - 210 + 1)) + 210
}, {
  xAxisPosition: '9',
  expectedValues_A: Math.floor(Math.random() * (260 - 250 + 1)) + 250,
  expectedValues_B: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue: Math.floor(Math.random() * (170 - 160 + 1)) + 160
}, {
  xAxisPosition: '10',
  expectedValues_A: Math.floor(Math.random() * (300 - 290 + 1)) + 290,
  expectedValues_B: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue: Math.floor(Math.random() * (150 - 140 + 1)) + 140
}];


const PlatformGraphComparative = ({ tableLegend_Y, tableLegend_X }) => {
  const [expectedValuesHide, setExpectedValuesHide] = useState(false);


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const values = [];
      let messageFlowValue = '';
      let messageExpectedValues = '';
      for (const element of payload) {
        if (element.name === 'doNotDisplay') {
          values.push(element.value);
        } else if (element.dataKey === "flowValue") {
          messageFlowValue = `${element.name}: ${element.value}L/min`;
        } else if (element.dataKey === "expectedValues_A") {
          messageExpectedValues = element.name;
        }
      }
      if (values.length) messageExpectedValues = `${messageExpectedValues}: ${values[0]}L/min - ${values[0] + values[1]}L/min`
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#F9FAFC', border: 'solid 1px #E9EAED' }}>
          <p className="label" style={{ margin: '0 5px' }}>{label}</p>
          <p className="intro" style={{ margin: '0 8px' }}>{messageFlowValue}</p>
          <p className="intro" style={{ margin: '0 8px' }}>{messageExpectedValues}</p>
        </div >
      );
    }
    return null;
  };

  const renderLegend = (props) => (
    <ul className="recharts-default-legend" style={{ padding: '0px', margin: '0px', textAlign: 'center' }}>
      {props.payload.map((entry, index) => (
        (entry.value !== 'doNotDisplay') && (
          <li
            onClick={() => (entry.dataKey !== 'flowValue') ? setExpectedValuesHide(!expectedValuesHide) : {}}
            className={`recharts-legend-item legend-item-${index}`}
            style={{ display: 'inline-block', marginRight: '10px' }}
            key={`item-${index}`}>
              <LinearScaleIcon />
              {entry.value}
          </li>
        )
      ))}
    </ul>
  );

  return (
    <Box sx={{ height: 500, overflow: "hidden" }} >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis dataKey="xAxisPosition" />
          <YAxis label={{ value: tableLegend_Y, angle: -90, position: 'insideLeft', fill: 'black', opacity: 0.5 }} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
          <Area type="monotone" dataKey="expectedValues_B" stackId="1" name='doNotDisplay' stroke="#11192A" fill="#FFF" hide={expectedValuesHide} />
          <Area type="monotone" dataKey="expectedValues_A" stackId="1" name='Valores esperados considerando o filtro selecionado' stroke="#11192A" fill="#68d2f2" hide={expectedValuesHide} />
          <Area type="monotone" dataKey="expectedValues_A" stackId="1" name='doNotDisplay' stroke="#FFF" fill="#FFF" hide={expectedValuesHide} />
          <Line type="monotone" dataKey="flowValue" stroke="#11192A" name={tableLegend_X} activeDot={{ r: 8 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PlatformGraphComparative;

