import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { fetchAll } from "../../../../services/api/patient";
import { useMyContext } from "../../../../providers/MyContext";

const useStyles = makeStyles((theme) => ({
  select: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#11192A",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#11192A",
      color: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#11192A",
      borderWidth: 2,
    },
    "& .MuiSelect-icon": {
      color: "white",
    },

    color: "white",
    marginLeft: 20
  },
}));

const SelectPatient = () => {
  const context = useMyContext();
  const classes = useStyles();
  const [patientId, setPatientId] = useState('');

  const [patients, setPatients] = useState([{}])

  useEffect(() => {
    fetchAllPatients()
  }, [])

  const fetchAllPatients = async () => {
    const result = await fetchAll()
    setPatients(result);
    setPatientId(result[0].id || '');
    context.setPatientId(result[0].id || '');
    context.setPatientName(result[0].name || '');
  }

  const handlePatientChange = (event) => {
    const patientId = event.target.value;
    setPatientId(patientId)
    context.setPatientId(patientId)
    const patient = patients.find(elem => elem.id === patientId);
    context.setPatientName(patient.name);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
      <FormControl sx={{ maxWidth: 250, minWidth: 150 }}>
        <Select
          className={classes.select}
          size="small"
          value={patientId}
          onChange={handlePatientChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {patients.length && patients.map((patient) => (
            <MenuItem
              key={`SelectPatient${patient.id}`}
              value={patient.id}
            >
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}
              >
                {patient.name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectPatient;
