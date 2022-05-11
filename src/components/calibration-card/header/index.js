import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const CalibrationCardHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F9FAFC',
        paddingLeft: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "none",
        borderBottom: "1px solid #E9EAED",
        //width: "100%",
        height: 50,
      }}
    >
      <Typography variant="h6" sx={{ color: "#11192A", fontSize: 17 }}>
        Pitaco
      </Typography>
    </Box>
  );
};

export default CalibrationCardHeader;
