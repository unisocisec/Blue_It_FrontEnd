import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./providers/Routes.jsx";
import Loading from "./components/loading/index";
import Notification from "./components/notification/index";
import CssBaseline from "@mui/material/CssBaseline";
import ValidateRoutes from "./components/validateRoutes/index";
import _config from "./providers/_config.js";


const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#11192A",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#11192A",
      secondary: "rgba(255,255,255,0.87)",
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
      <Loading />
      <Notification />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={<ValidateRoutes {...route} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
