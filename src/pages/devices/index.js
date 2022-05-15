import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DeviceCard from "../../components/device-card";
import { fetchDevices } from "../../services/api/calibration";

const DevicesPage = () => {
  const [historiesCalibrations, setHistoriesCalibrations] = useState([]);

  useEffect(() => {
    getHistoryCalibration();
  }, []);

  const getHistoryCalibration = async () => {
    const result = await fetchDevices();
    setHistoriesCalibrations(result);
  };

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
