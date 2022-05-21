import React, { useEffect, useState } from "react";
import DeviceSelect from "../../../components/device-select";
import DateInterval from "../../../components/date-interval";
import { Box, Button, Typography } from "@mui/material";
import SelectComponent from "../../../components/select";
import { makeStyles } from "@mui/styles";
import {
  fetchPointsAndLevelsAndPlays,
  fetchResults,
} from "../../../services/api/result";
import { useMyContext } from "../../../providers/MyContext";
import CalibrationGraph from "../../../components/calibration-graph";
import MicroCard from "../../../components/micro-card";

const NO_HISTORY_MESSAGE = "Não existe histórico para os filtros selecionados.";

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

const ResultPage = () => {
  const classes = useStyles();
  const context = useMyContext();

  const [resultData, setResultData] = useState([]);
  const [device, setDevice] = useState("Pitaco");
  const [visualization, setVisualization] = useState("result");
  const [visualizationAfterRequest, setVisualizationAfterRequest] =
    useState("result");
  const [startDate, setStartDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [microCardsValues, setMicroCardsValues] = useState([
    {
      value: 0,
      title: "Pontuação acumulada",
    },
    {
      value: 0,
      title: "Níveis desbloqueados",
    },
    {
      value: 0,
      title: "Seções jogadas",
    },
  ]);

  useEffect(() => {
    fetchMicroCardsValues();
  }, []);

  const fetchMicroCardsValues = async () => {
    context.setLoading(true);
    const pointsAndLevelsAndPlaysApiResult = await fetchPointsAndLevelsAndPlays(
      context.patientId
    );
    setMicroCardsValues(pointsAndLevelsAndPlaysApiResult);
    context.setLoading(false);
  };

  const handleFilterButton = async () => {
    context.setLoading(true);
    const apiResponse = await fetchResults(
      context.patientId,
      device,
      visualization
    );
    setResultData(apiResponse);
    if (apiResponse && apiResponse.length <= 1) {
      context.addNotification("error", NO_HISTORY_MESSAGE);
    }
    setVisualizationAfterRequest(visualization);
    context.setLoading(false);
  };

  return (
    <>
      <Typography variant="h2" sx={{ fontSize: 20 }}>
        Resultados na plataforma
      </Typography>
      <Box sx={{ marginTop: 4, display: "flex", flexWrap: "wrap" }}>
        {microCardsValues.map((microCardValue) => (
          <MicroCard
            title={microCardValue.title}
            value={microCardValue.value}
          />
        ))}
      </Box>

      <Box className={classes.container}>
        <DeviceSelect device={device} setDevice={setDevice} />
        <Box sx={{ width: 200, marginRight: 2 }}>
          <SelectComponent
            handleChangeCallBack={setVisualization}
            title="Visualização"
            items={[
              {
                key: "result",
                value: "Pontuação",
              },
              { key: "maxExpFlow", value: "Pico Expiratório" },
              { key: "maxInsFlow", value: "Pico Inspiratório" },
              { key: "scoreRatio", value: "Razão" },
            ]}
            initialKey={visualization}
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
      {(resultData.length === 0 && (
        <Typography sx={{ opacity: 0.5 }} variant="subtitle1">
          Selecione os filtros desejados.
        </Typography>
      )) ||
        (resultData.length > 1 && (
          <CalibrationGraph
            data={resultData}
            exercise={visualizationAfterRequest}
          />
        )) || (
          <Typography sx={{ opacity: 0.5 }} variant="subtitle1">
            {NO_HISTORY_MESSAGE}
          </Typography>
        )}
    </>
  );
};

export default ResultPage;
