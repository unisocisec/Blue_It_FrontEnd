/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import DeviceSelect from "../../../components/device-select";
import SelectComponent from "../../../components/select";
import DateInterval from "../../../components/date-interval";
import { useMyContext } from "../../../providers/MyContext";
import { getGeneralStatisticsDataFromTheMiniGame } from "../../../services/api/miniGames";


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

  const [noHistoryMessage] = useState('Não existe histórico para os filtros selecionados.');
  const [listMiniGame] = useState([
    { key: "CakeGame", value: "Velas no Bolo" },
    { key: "WaterGame", value: "Copo D'Água" },
  ]);
  const [listHistoryCalibration] = useState([
    { key: "includeHistoryCalibration", value: "Apresentar" },
    { key: "excludeHistoryCalibration", value: "Não Apresentar" },
  ]);
  const [device, setDevice] = useState("Pitaco");
  const [startDate, setStartDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [miniGame, setMiniGame] = useState("CakeGame");
  const [historyCalibration, setHistoryCalibration] = useState("includeHistoryCalibration");
  const [resultData, setResultData] = useState([]);

  const handleFilterButton = async (event) => {
    event.preventDefault();
    
    const filters = {
      devices: device,
      minigameName: miniGame,
    };
    await getGeneralStatisticsDataFromTheMiniGame(context, filters, historyCalibration);

  };

  return (
    <>
      <Typography variant="h2" sx={{ fontSize: 20 }}>
        Minigames - Estatísticas Gerais
      </Typography>

      <Box
        component="form"
        onSubmit={handleFilterButton}
        className={classes.container}
      >
        <DeviceSelect
          device={device}
          setDevice={setDevice}
        />
        <Box sx={{ width: 200, marginRight: 2 }}>
          <SelectComponent
            handleChangeCallBack={setMiniGame}
            title="Minigame"
            items={listMiniGame}
            initialKey={miniGame}
          />
        </Box>
        <Box sx={{ width: 200, marginRight: 2 }}>
          <SelectComponent
            handleChangeCallBack={setHistoryCalibration}
            title="Valores Calibrados"
            items={listHistoryCalibration}
            initialKey={historyCalibration}
          />
        </Box>

        <Box sx={{ marginRight: 2 }}>
          <DateInterval
            handleStartDateChangeCallBack={setStartDate}
            handleFinalDateChangeCallBack={setFinalDate}
          />
        </Box>
        <Button
          size="large"
          type="submit"
          variant="contained"
          className={classes.button}
        >
          Filtrar
        </Button>
      </Box>

      {(resultData.length === 0) ? (
        <Typography sx={{ opacity: 0.5 }} variant="subtitle1">
          Selecione os filtros desejados.
        </Typography>
      ) : (resultData.length) ? (
        // <CalibrationGraph
        //   data={resultData}
        //   exercise={visualizationAfterRequest}
        // />
        <div></div>
      ) : (
        <Typography sx={{ opacity: 0.5 }} variant="subtitle1">
          {noHistoryMessage}
        </Typography>
      )}
    </>
  );
};

export default ResultPage;
