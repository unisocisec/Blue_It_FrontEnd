import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalibrationGraph from "../../components/calibration-graph";
import SelectComponent from "../../components/select";
import DateInterval from "../../components/date-interval";
import { makeStyles } from "@mui/styles";
import { fetchHistory } from "../../services/api/calibration";
import {useMyContext} from "../../providers/MyContext";
import DeviceSelect from "../../components/device-select";

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

const NO_HISTORY_MESSAGE = 'Não existe histórico para os filtros selecionados.'

const CalibrationHistoryPage = () => {
  const context = useMyContext();

  const classes = useStyles();

  const [history, setHistory] = useState([]);

  const [device, setDevice] = useState("Pitaco");
  const [exercise, setExercise] = useState("RespiratoryFrequency");
  const [exerciseAfterRequest, setExerciseAfterRequest] = useState("RespiratoryFrequency");
  const [startDate, setStartDate] = useState();
  const [finalDate, setFinalDate] = useState();

  const handleFilterButton = async () => {
    context.setLoading(true)
    const result = await fetchHistory(device, exercise, context.patientId);
    setHistory(result);
    if(result && result.length <= 1) {
      context.addNotification('error', NO_HISTORY_MESSAGE)
    }
    setExerciseAfterRequest(exercise);
    context.setLoading(false)
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
        <DeviceSelect device={device} setDevice={setDevice}/>
        <Box sx={{ width: 200, marginRight: 2 }}>
          <SelectComponent
            handleChangeCallBack={setExercise}
            title="Exercício"
            items={[
              {
                key: "RespiratoryFrequency",
                value: "Frequência Respiratória",
              },
              { key: "ExpiratoryPeak", value: "Pico Expiratório" },
              { key: "ExpiratoryDuration", value: "Duração Expiratória" },
              { key: "InspiratoryPeak", value: "Pico Inspiratório" },
              { key: "InspiratoryDuration", value: "Duração Inspiratória" }
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
      {(history.length === 0 && <Typography sx={{opacity: 0.5}} variant="subtitle1">Selecione os filtros desejados.</Typography>)
          || (history.length > 1 && <CalibrationGraph data={history} exercise={exerciseAfterRequest} />)
          || <Typography sx={{opacity: 0.5}} variant="subtitle1">{NO_HISTORY_MESSAGE}</Typography>}
    </Box>
  );
};

export default CalibrationHistoryPage;
