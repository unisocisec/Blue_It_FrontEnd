import React, {useState} from "react";
import DeviceSelect from "../../../components/device-select";
import DateInterval from "../../../components/date-interval";
import {Box, Button, Typography} from "@mui/material";
import SelectComponent from "../../../components/select";
import {makeStyles} from "@mui/styles";

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

    const [device, setDevice] = useState("Pitaco");
    const [visualization, setVisualization] = useState("Point")
    const [startDate, setStartDate] = useState();
    const [finalDate, setFinalDate] = useState();

    return (
        <>
            <Typography variant="h2" sx={{ fontSize: 20 }}>
                Histórico de calibrações
            </Typography>
            <Box className={classes.container}>
            <DeviceSelect device={device} setDevice={setDevice} />
            <Box sx={{ width: 200, marginRight: 2 }}>
                <SelectComponent
                    handleChangeCallBack={setVisualization}
                    title="Visualização"
                    items={[
                        {
                            key: "Point",
                            value: "Pontuação",
                        },
                        { key: "ExpiratoryPeak", value: "Pico Expiratório" },
                        { key: "ExpiratoryDuration", value: "Duração Expiratória" },
                        { key: "InspiratoryPeak", value: "Pico Inspiratório" },
                        { key: "InspiratoryDuration", value: "Duração Inspiratória" }
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
                onClick={() => {}}
            >
                Filtrar
            </Button>
        </Box>
    </>)
}

export default ResultPage