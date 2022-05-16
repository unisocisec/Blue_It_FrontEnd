import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const MeasureBox = ({ isLeft, title, value }) => {
  return (
    <Box
      sx={{
        paddingLeft: 2,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "none",
        borderRight: isLeft ? "1px solid #E9EAED" : "none",
        borderBottom: "1px solid #E9EAED",
        width: '50%',
        height: 100,
      }}
    >
      <Box sx={{ width: '100%', display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: "#11192A", opacity: 0.8, fontSize: 14, fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: "#212EFF", fontSize: 14, marginRight: 2, fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default MeasureBox;
