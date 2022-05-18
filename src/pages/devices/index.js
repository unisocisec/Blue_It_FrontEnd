import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DeviceCard from "../../components/device-card";
import { fetchDevices } from "../../services/api/calibration";
import {useMyContext} from "../../providers/MyContext";

const DevicesPage = () => {
  const contex = useMyContext()
  const [historiesCalibrations, setHistoriesCalibrations] = useState([]);

  useEffect(() => {
    getHistoryCalibration();
  }, []);

  const getHistoryCalibration = async () => {
    contex.setLoading(true);
    const result = await fetchDevices(contex.patientId);
    setHistoriesCalibrations(result);
    contex.setLoading(false);
  };

  if(!contex.patientId) {
      return (<Typography variant="h2" sx={{fontSize: 20}}>Um paciente precisa ser selecionado!</Typography>);
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
        Instrumentos calibrados
      </Typography>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexFlow: "wrap",
        }}
      >
        {historiesCalibrations.map((historyCalibration) => (
          <DeviceCard historyCalibration={historyCalibration} />
        ))}
      </Box>
    </Box>
  );
};

export default DevicesPage;
