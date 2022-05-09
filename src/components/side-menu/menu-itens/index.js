import React from "react";
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
import { Typography } from "@mui/material";
import MenuItemTemplate from "./menu-item-template";

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
  return (
    <>
      {/* <Toolbar />
      <Divider /> */}
      <List sx={{ marginTop: 2 }}>
        <Box>
          <Avatar
            sx={{ width: 65, height: 65, margin: "auto", marginBottom: 1 }}
          />
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}
          >
            Alexandre Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "white", opacity: 0.7 }}
          >
            Paciente
          </Typography>
        </Box>

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
          submenus={[]}
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
            { title: "Histórico", icon: <HistoryIcon sx={{ fontSize: 17 }} /> },
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
          submenus={[]}
        />

        {divider}

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
          title="Paciente"
          icon={<PersonIcon sx={{ fontSize: 17 }} />}
          submenus={[]}
        />
      </List>
    </>
  );
};

export default MenuItens;
