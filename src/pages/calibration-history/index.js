import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalibrationGraph from "../../components/calibration-graph";
import SelectComponent from "../../components/select";
import DateInterval from "../../components/date-interval";
import { makeStyles } from "@mui/styles";
import { fetchHistory } from "../../services/api/calibration";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    flexFlow: "wrap",
    marginBottom: 50,
    rowGap: 15,
    marginTop: 30,
  },
  button: {
    height: 40,
    marginTop: "auto",
    backgroundColor: "#1e2b48",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1e2b48",
      opacity: 0.7,
      color: "white",
    },
  },
}));

const CalibrationHistoryPage = () => {
  const classes = useStyles();

  const [history, setHistory] = useState([]);

  const [device, setDevice] = useState("Pitaco");
  const [exercise, setExercise] = useState("Frequência Respiratória");
  const [startDate, setStartDate] = useState();
  const [finalDate, setFinalDate] = useState();

  useEffect(() => {
    const result = fetchHistory(device, exercise);
    setHistory(result);
  }, []);

  const handleFilterButton = () => {
    console.log(device);
    console.log(exercise);
    console.log(startDate);
    console.log(finalDate);
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
        Histórico de calibrações
      </Typography>
      <Box className={classes.container}>
        <Box sx={{ width: 200, marginRight: 2 }}>
          <SelectComponent
            handleChangeCallBack={setDevice}
            title="Dispositivo"
            items={[
              { key: "Pitaco", value: "Pitaco" },
              { key: "Manovacuômetro", value: "Manovacuômetro" },
              { key: "Cinta", value: "Cinta" },
            ]}
            initialKey={device}
          />
        </Box>
        <Box sx={{ width: 200, marginRight: 2 }}>
          <SelectComponent
            handleChangeCallBack={setExercise}
            title="Exercício"
            items={[
              {
                key: "Frequência Respiratória",
                value: "Frequência Respiratória",
              },
              { key: "Pico Expiratório", value: "Pico Expiratório" },
              { key: "Duração Expiratória", value: "Duração Expiratória" },
              { key: "Pico Inspiratório", value: "Pico Inspiratório" },
              { key: "Duração Inspiratória", value: "Duração Inspiratória" }
            ]}
            initialKey={exercise}
          />
        </Box>
        <Box sx={{ marginRight: 2 }}>
          <DateInterval
            handleStartDateChangeCallBack={setStartDate}
            handleFinalDateChangeCallBack={setFinalDate}
          />
        </Box>

        <Button
          className={classes.button}
          variant="contained"
          size="large"
          onClick={handleFilterButton}
        >
          Filtrar
        </Button>
      </Box>
      <CalibrationGraph data={history} unitMeasure="L/min" />
    </Box>
  );
};

export default CalibrationHistoryPage;
