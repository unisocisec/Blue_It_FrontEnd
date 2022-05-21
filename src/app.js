import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/loading/index";
import Notification from "./components/notification";
import CssBaseline from "@mui/material/CssBaseline";
import AssemblyOfRoutes from "./components/AssemblyOfRoutes";
import _config from "./providers/_config.js";


const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
      //main: "#11192A",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "rgba(255,255,255,0.87)",
    },
    background: {
      paper: "#11192A", //#010216
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
      <Loading />
      <Notification />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AssemblyOfRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
