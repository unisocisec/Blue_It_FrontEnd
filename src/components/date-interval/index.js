import React from "react";
import Box from "@mui/material/Box";
import DateInput from "../date-input";

const DateInterval = ({
  handleStartDateChangeCallBack,
  handleFinalDateChangeCallBack,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexFlow: "wrap",
        rowGap: 2,
      }}
    >
      <Box sx={{ marginRight: 2 }}>
        <DateInput
          handleDateChangeCallBack={handleStartDateChangeCallBack}
          title="Data inicial"
        />
      </Box>
      <DateInput
        handleDateChangeCallBack={handleFinalDateChangeCallBack}
        title="Data final"
      />
    </Box>
  );
};

export default DateInterval;
