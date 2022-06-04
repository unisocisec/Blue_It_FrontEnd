import React, { useState } from 'react';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend, Bar } from 'recharts';
import { Box } from "@mui/material";

const PlatformGraphComparative = ({ tableLegend_Y, tableLegend_X, graphData, viewType, unitOfMeasurement }) => {
  const [expectedValuesHide, setExpectedValuesHide] = useState(false);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const values = [];
      let messageFlowValue = '';
      let messageExpectedValues = '';
      for (const element of payload) {
        if (element.name === setDataKey("expectedValues_B")) {
          values.push(element.value);
        } else if (element.dataKey === setDataKey("expectedValues_A")) {
          messageExpectedValues = element.name;
          values.push(element.value);
        } else {
          messageFlowValue = `${element.name}: ${element.value}${unitOfMeasurement}`;
        }
      }
      if (values.length) messageExpectedValues = `${messageExpectedValues}: ${values[0]}${unitOfMeasurement} - ${values[0] + values[1]}${unitOfMeasurement}`
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
    <ul className="recharts-default-legend" style={{ padding: '0px', margin: '0px', display: 'flex', textAlign: 'center', justifyContent: 'center', }}>
      {props.payload.map((entry, index) => (
        (entry.value !== setDataKey("expectedValues_B")) && (
          <li
            onClick={() => (entry.dataKey === setDataKey("expectedValues_A")) ? setExpectedValuesHide(!expectedValuesHide) : {}}
            className={`recharts-legend-item legend-item-${index}`}
            style={{ display: 'flex', marginRight: '10px' }}
            key={`item-${index}`}>
            <LinearScaleIcon />
            {entry.value}
          </li>
        )
      ))}
    </ul>
  );

  const setDataKey = (name) => {
    if (viewType === 1) {
      return `${name}_Exp`;
    }
    if (viewType === 2) {
      return `${name}_Ins`
    }
    return '';
  };

  return (
    <Box sx={{ height: 500, overflow: "hidden" }} >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={testData}
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
          {(viewType === 1 || viewType === 2) ? (
            <>
              <Area
                stackId="1"
                type="monotone"
                fill="#FFF"
                stroke="#68d2f2"
                dataKey={setDataKey("expectedValues_B")}
                hide={expectedValuesHide}
              />
              <Area
                stackId="1"
                type="monotone"
                fill="#68d2f2"
                stroke="#68d2f2"
                dataKey={setDataKey("expectedValues_A")}
                name='Valores esperados considerando o filtro selecionado'
                hide={expectedValuesHide}
              />
              <Line
                type="monotone"
                stroke="#0080ff"
                activeDot={{ r: 8 }}
                name={tableLegend_X}
                dataKey={setDataKey("flowValue")}
              />
            </>
          ) : (
            <>
              <Bar
                dataKey="flowValue_Bar"
                name={tableLegend_X}
                barSize={20}
                fill="#0080ff"
                hide={false}
              />
              <Bar
                dataKey="scoreComp"
                name='Razão Comum de Pacientes Selecionados'
                barSize={20}
                fill="#413ea0"
              />
              <Bar
                dataKey="maxsCore"
                name='Porcentagem máxima'
                barSize={20}
                fill="#ff0303"
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PlatformGraphComparative;

const testData = [{
  xAxisPosition: '1',
  expectedValues_A_Exp: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Exp: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  expectedValues_A_Ins: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Ins: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue_Exp: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  flowValue_Ins: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  flowValue_Bar: 100,
  scoreComp: 1,
  maxsCore: 100,
}, {
  xAxisPosition: '2',
  expectedValues_A_Exp: Math.floor(Math.random() * (270 - 260 + 1)) + 260,
  expectedValues_B_Exp: Math.floor(Math.random() * (170 - 160 + 1)) + 160,
  expectedValues_A_Ins: Math.floor(Math.random() * (270 - 260 + 1)) + 260,
  expectedValues_B_Ins: Math.floor(Math.random() * (170 - 160 + 1)) + 160,
  flowValue_Exp: Math.floor(Math.random() * (240 - 230 + 1)) + 230,
  flowValue_Ins: Math.floor(Math.random() * (240 - 230 + 1)) + 230,
}, {
  xAxisPosition: '3',
  expectedValues_A_Exp: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Exp: Math.floor(Math.random() * (160 - 150 + 1)) + 150,
  expectedValues_A_Ins: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Ins: Math.floor(Math.random() * (160 - 150 + 1)) + 150,
  flowValue_Exp: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  flowValue_Ins: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
}, {
  xAxisPosition: '4',
  expectedValues_A_Exp: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Exp: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  expectedValues_A_Ins: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Ins: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  flowValue_Exp: Math.floor(Math.random() * (210 - 200 + 1)) + 200,
  flowValue_Ins: Math.floor(Math.random() * (210 - 200 + 1)) + 200,
  flowValue_Bar: 100,
  scoreComp: 1,
  maxsCore: 100,
}, {
  xAxisPosition: '5',
  expectedValues_A_Exp: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Exp: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  expectedValues_A_Ins: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Ins: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue_Exp: Math.floor(Math.random() * (210 - 200 + 1)) + 200,
  flowValue_Ins: Math.floor(Math.random() * (210 - 200 + 1)) + 200,
}, {
  xAxisPosition: '6',
  expectedValues_A_Exp: Math.floor(Math.random() * (260 - 250 + 1)) + 250,
  expectedValues_B_Exp: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  expectedValues_A_Ins: Math.floor(Math.random() * (260 - 250 + 1)) + 250,
  expectedValues_B_Ins: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  flowValue_Exp: Math.floor(Math.random() * (240 - 230 + 1)) + 230,
  flowValue_Ins: Math.floor(Math.random() * (240 - 230 + 1)) + 230,
}, {
  xAxisPosition: '7',
  expectedValues_A_Exp: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Exp: Math.floor(Math.random() * (120 - 110 + 1)) + 110,
  expectedValues_A_Ins: Math.floor(Math.random() * (280 - 270 + 1)) + 270,
  expectedValues_B_Ins: Math.floor(Math.random() * (120 - 110 + 1)) + 110,
  flowValue_Exp: Math.floor(Math.random() * (230 - 220 + 1)) + 220,
  flowValue_Ins: Math.floor(Math.random() * (230 - 220 + 1)) + 220,
}, {
  xAxisPosition: '8',
  expectedValues_A_Exp: Math.floor(Math.random() * (270 - 260 + 1)) + 260,
  expectedValues_B_Exp: Math.floor(Math.random() * (120 - 110 + 1)) + 110,
  expectedValues_A_Ins: Math.floor(Math.random() * (270 - 260 + 1)) + 260,
  expectedValues_B_Ins: Math.floor(Math.random() * (120 - 110 + 1)) + 110,
  flowValue_Exp: Math.floor(Math.random() * (220 - 210 + 1)) + 210,
  flowValue_Ins: Math.floor(Math.random() * (220 - 210 + 1)) + 210,
  flowValue_Bar: 100,
  scoreComp: 1,
  maxsCore: 100,
}, {
  xAxisPosition: '9',
  expectedValues_A_Exp: Math.floor(Math.random() * (260 - 250 + 1)) + 250,
  expectedValues_B_Exp: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  expectedValues_A_Ins: Math.floor(Math.random() * (260 - 250 + 1)) + 250,
  expectedValues_B_Ins: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue_Exp: Math.floor(Math.random() * (170 - 160 + 1)) + 160,
  flowValue_Ins: Math.floor(Math.random() * (170 - 160 + 1)) + 160,
}, {
  xAxisPosition: '10',
  expectedValues_A_Exp: Math.floor(Math.random() * (300 - 290 + 1)) + 290,
  expectedValues_B_Exp: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  expectedValues_A_Ins: Math.floor(Math.random() * (300 - 290 + 1)) + 290,
  expectedValues_B_Ins: Math.floor(Math.random() * (140 - 130 + 1)) + 130,
  flowValue_Exp: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  flowValue_Ins: Math.floor(Math.random() * (150 - 140 + 1)) + 140,
  flowValue_Bar: 100,
  scoreComp: 1,
  maxsCore: 100,
}];