/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import InputFilter from "../../../components/input-filter/results";
import DeviceSelect from "../../../components/device-select";
import SelectComponent from "../../../components/select";
import { useMyContext } from "../../../providers/MyContext";
import { getPlatformComparative } from "../../../services/api/platform";

import PlatformGraphComparative from "../../../components/platform-graph/comparative";


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

const PlatformComparative = () => {
	const classes = useStyles();
	const context = useMyContext();

	const [listCondition] = useState([
		{ key: "Healthy", value: "Saudável" },
		{ key: "Obstructive", value: "Obstrutivo" },
		{ key: "Restrictive", value: "Restritivo" },
	]);
	const [listSex] = useState([
		{ key: "Male", value: "Masculino" },
		{ key: "Female", value: "Feminino" },
	]);
	const [listVisualization] = useState([
		{ key: "expiratory_peak", value: "Pico Expiratório" },
		{ key: "inspiratory_peak", value: "Pico Inspiratório" },
		{ key: "score", value: "Pontuação" },
		{ key: "ratio", value: "Razão" },
	]);


	const [warning, setWarning] = useState('Selecione os filtros desejados.');
	const [condition, setCondition] = useState("Healthy");
	const [sex, setSex] = useState("Male");
	const [initialAge, setInitialAge] = useState(context.patientBirthDate ? moment().diff(context.patientBirthDate, 'years') - 3 : 1);
	const [finalAge, setFinalAge] = useState(context.patientBirthDate ? moment().diff(context.patientBirthDate, 'years') + 3 : 1);
	const [visualization, setVisualization] = useState("expiratory_peak");
	const [device, setDevice] = useState("Pitaco");
	// const [tableLegend_X, setTableLegend_X] = useState('Maior pico da sessão');
	// const [tableLegend_Y, setTableLegend_Y] = useState('Pico Expiratório L/min');
	const [graphData, setGraphData] = useState([]);

	const initialState = () => {
		setWarning('Selecione os filtros desejados.')
		setCondition("Healthy");
		setSex("Male");
		setInitialAge(context.patientBirthDate ? moment().diff(context.patientBirthDate, 'years') - 3 : 1);
		setFinalAge(context.patientBirthDate ? moment().diff(context.patientBirthDate, 'years') + 3 : 1);
		setVisualization("expiratory_peak");
		setDevice("Pitaco");
		setGraphData([]);
	}

	const validateAgeField = (updateMethod, value) => {
		if (`${value}`.length <= 2 && value >= 1) {
			updateMethod(value)
		} else if (!value) {
			updateMethod(1)
		}
	}

	const handleFilterButton = async (event) => {
		event.preventDefault();
		try {
			const filters = {
				condition: condition,
				sex: sex,
				devices: device,
				toBirthday: `${moment().format('YYYY') - initialAge}-01-01`,
				fromBirthday: `${moment().format('YYYY') - finalAge}-12-31`,
			}
			const graphData = await getPlatformComparative(context, filters, visualization);
			setGraphData([...graphData]);
			if (!graphData.length) {
				context.addNotification('error', 'Não existe histórico para os filtros selecionados.');
				setWarning('Não existe histórico para os filtros selecionados.');
			}
		} catch (error) {
			setGraphData([...[]])
		}
	};

	useEffect(() => {
		if (context.patientId) initialState();
	}, [context.patientId]);

	return (
		<>
			<Typography variant="h2" sx={{ fontSize: 20 }}>
				Plataforma - Comparativos
			</Typography>
			<Box
				component="form"
				onSubmit={handleFilterButton}
				className={classes.container}
			>
				<Box sx={{ width: 150, marginRight: 2 }}>
					<SelectComponent
						handleChangeCallBack={setCondition}
						title="Condição"
						items={listCondition}
						initialKey={condition}
					/>
				</Box>

				<Box sx={{ width: 150, marginRight: 2 }}>
					<SelectComponent
						handleChangeCallBack={setSex}
						title="Sexo"
						items={listSex}
						initialKey={sex}
					/>
				</Box>

				<Box sx={{ width: 100, marginRight: 2 }}>
					<InputFilter
						required
						type="number"
						id="initialAge"
						name="initialAge"
						autoComplete="initialAge"
						label="Idade Inicial"
						value={initialAge}
						onChange={(e) => validateAgeField(setInitialAge, e.target.value)}
					/>
				</Box>

				<Box sx={{ width: 100, marginRight: 2 }}>
					<InputFilter
						required
						type="number"
						id="initialAge"
						name="initialAge"
						autoComplete="initialAge"
						label="Idade Final"
						value={finalAge}
						onChange={(e) => validateAgeField(setFinalAge, e.target.value)}
					/>
				</Box>

				<DeviceSelect
					device={device}
					setDevice={setDevice}
				/>

				<Box sx={{ width: 200, marginRight: 2 }}>
					<SelectComponent
						items={listVisualization}
						title="Visualização"
						initialKey={visualization}
						handleChangeCallBack={setVisualization}
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

			{!graphData.length ? (
				<Typography sx={{ opacity: 0.5 }} variant="subtitle1">
					{warning}
				</Typography>
			) : (
				<PlatformGraphComparative />
			)}
		</>
	);
};

export default PlatformComparative;
