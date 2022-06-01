/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';


import { useMyContext } from "../../providers/MyContext";
import { getPatientInformation } from '../../services/api/informationPanel';


const InformationPanel = () => {
  const context = useMyContext();
  const [patientData, setPatientData] = useState([]);


  useEffect(() => {
    if (context.patientId) setPatientInformation();
  }, [context.patientId]);


  const setPatientInformation = async () => {
    try {
      const patientInformation = await getPatientInformation(context);
      const newPatientData = [];
      if (patientInformation) {
        newPatientData.push({ fieldName: 'Nome', fieldValue: patientInformation.name })
        newPatientData.push({ fieldName: 'Sexo', fieldValue: translateSex(patientInformation.sex) })
        newPatientData.push({ fieldName: 'Condição', fieldValue: translateCondition(patientInformation.condition) })
        newPatientData.push({ fieldName: 'Data de Nascimento', fieldValue: moment(patientInformation.birthday).format("l") })
        newPatientData.push({ fieldName: 'Peso', fieldValue: `${patientInformation.weight} kg` })
        newPatientData.push({ fieldName: 'Altura', fieldValue: `${patientInformation.height}  cm` })
        newPatientData.push({ fieldName: 'Observações', fieldValue: patientInformation.observations === 'None' ? '-' : patientInformation.observations })
      }
      setPatientData([...newPatientData]);
    } catch (error) { }
  }

  const translateSex = (condition) => {
    if (condition === 'Male') return 'Masculino';
    return 'Feminino';
  }

  const translateCondition = (condition) => {
    if (condition === 'Obstructive') return 'Obstrutivo';
    if (condition === 'Healthy') return 'Saudável';
  }

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" sx={{ fontSize: 20 }}>
        Painel de Informações
      </Typography>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          alignItems: 'center',
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            marginBottom: 5,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              padding: 2,
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: '#F9FAFC',
              borderBottom: "1px solid #E9EAED",
            }}
          >
            <Typography variant="h6" sx={{ color: "#11192A", fontSize: 17 }}>
              Dados Gerais
            </Typography>
          </Box>
          <Box sx={{
            padding: 2,
            display: "flex",
            alignItems: 'flex-start',
            flexDirection: "column",
          }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300, width: '30vw' }} aria-label="custom pagination table" >
                <TableBody>
                  {patientData.map(elem => (
                    <TableRow key={elem.fieldName} style={{ border: 'solid 3px #11192A' }}>
                      <TableCell component="th" scope="row" style={{ color: '#11192A', background: 'white' }}>
                        {elem.fieldName}
                      </TableCell>
                      <TableCell style={{ width: 160, color: '#11192A', background: 'white' }} align="right">
                        {elem.fieldValue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default InformationPanel;