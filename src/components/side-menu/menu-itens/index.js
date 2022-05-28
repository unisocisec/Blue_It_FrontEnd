/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import SelectComponent from "../../select"
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ScaleIcon from "@mui/icons-material/Scale";
import ExtensionIcon from "@mui/icons-material/Extension";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { Typography } from "@mui/material";
import MenuItemTemplate from "./menu-item-template";
import AddIcon from '@mui/icons-material/Add';

import { useMyContext } from "../../../providers/MyContext";
import SelectPatient from "./select-patient";
import { pathRoutes } from "../../../providers/Routes";
import { getTokenParameters } from '../../../providers/sessionStorage';



const divider = (
  <Divider
    sx={{
      backgroundColor: "white",
      opacity: 0.25,
      maxWidth: 260,
      margin: "auto",
      marginTop: 4,
      marginBottom: 4,
    }}
  />
);

const MenuItens = () => {
  const context = useMyContext();
  const [permission] = useState(getTokenParameters('role') === "Administrator");

  useEffect(() => {
    if (!permission) setPatientAccount()
  }, []);

  const setPatientAccount = async () => {
    context.setPatientId(getTokenParameters('pacientId'));
    context.setPatientName(getTokenParameters('fullname'));
  }

  return (
    <>
      <List sx={{ marginTop: 2 }}>

        {permission && (
          <Box>
            <Avatar
              sx={{ width: 65, height: 65, margin: "auto", marginBottom: 1 }}
            />
            <SelectPatient />
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "white", opacity: 0.7 }}
            >
              Paciente
            </Typography>
          </Box>
        )}

        {divider}
        <Typography
          variant="subtitle1"
          sx={{
            marginLeft: 2,
            marginBottom: 0.5,
            fontSize: 14,
            opacity: 0.25,
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Typography>
        <MenuItemTemplate
          title="Painel geral"
          icon={<DashboardIcon sx={{ fontSize: 17 }} />}
          submenus={[
            { title: "Painel de Informações", path: pathRoutes.INFORMATION_PANEL, icon: <DeviceHubIcon sx={{ fontSize: 17 }} /> },
          ]}
        />

        {divider}
        <Typography
          variant="subtitle1"
          sx={{
            marginLeft: 2,
            marginBottom: 0.5,
            fontSize: 14,
            opacity: 0.25,
            fontWeight: "bold",
          }}
        >
          Gráficos
        </Typography>
        <MenuItemTemplate
          title="Calibração"
          icon={<ScaleIcon sx={{ fontSize: 17 }} />}
          submenus={[
            { title: "Instrumentos", path: pathRoutes.CALIBRATION_INSTRUMENTS, icon: <DeviceHubIcon sx={{ fontSize: 17 }} /> },
            { title: "Histórico", path: pathRoutes.HISTORICAL_CALIBRATION, icon: <HistoryIcon sx={{ fontSize: 17 }} /> }
          ]}
        />
        <MenuItemTemplate
          title="Minigames"
          icon={<SportsEsportsIcon sx={{ fontSize: 17 }} />}
          submenus={[]}
        />
        <MenuItemTemplate
          title="Plataforma"
          icon={<ExtensionIcon sx={{ fontSize: 17 }} />}
          submenus={[
            { title: "Resultados", path: pathRoutes.PLATFORM_RESULTS, icon: <DeviceHubIcon sx={{ fontSize: 17 }} /> },
            { title: "Comparativo", path: pathRoutes.PLATFORM_COMPARATIVE, icon: <HistoryIcon sx={{ fontSize: 17 }} /> }
          ]}
        />

        {divider}

        {permission && (
          <>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: 2,
                marginLeft: 2,
                marginBottom: 0.5,
                fontSize: 14,
                opacity: 0.25,
                fontWeight: "bold",
              }}
            >
              Sistema
            </Typography>
            <MenuItemTemplate
              title="Config do Jogo"
              icon={<SportsEsportsIcon sx={{ fontSize: 17 }} />}
              submenus={[
                { title: "Sugestões", path: pathRoutes.SUGGESTION, icon: <AddIcon sx={{ fontSize: 17 }} /> },
                { title: "Crie do seu jeito", path: pathRoutes.CREATE_IT_YOUR_WAY, icon: <AddIcon sx={{ fontSize: 17 }} /> },
              ]}
            />
            <MenuItemTemplate
              title="Paciente"
              icon={<PersonIcon sx={{ fontSize: 17 }} />}
              submenus={[
                { title: "Conta do Paciente", path: pathRoutes.PATIENT_ACCOUNT, icon: <AddIcon sx={{ fontSize: 17 }} /> },
              ]}
            />
          </>
        )}
      </List>
    </>
  );
};

export default MenuItens;
