import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalibrationPage from "./pages/calibration";
import LoginPage from "./pages/login";
import LayoutPage from "./pages/layout";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
    },
    background: {
      paper: "#11192A",//#010216
    },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
  },
});

const App = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutPage />}>
              <Route path="calibration" element={<CalibrationPage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
