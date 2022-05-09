// import React from "react";
import * as React from "react";
import Constants from "../../utils/contants";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "../../components/header";
import TemporaryDrawer from "../../components/side-menu/temporary-drawer";
import PermanentDrawer from "../../components/side-menu/permanent-drawer";
import MenuItens from "../../components/side-menu/menu-itens";

function LayoutPage(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const SideBar = (
    <>
      <Box
        component="nav"
        sx={{ width: { sm: Constants.DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <TemporaryDrawer
          width={Constants.DRAWER_WIDTH}
          open={mobileOpen}
          onCloseCallback={() => setMobileOpen(!mobileOpen)}
        >
          <MenuItens />
        </TemporaryDrawer>
        <PermanentDrawer width={Constants.DRAWER_WIDTH}>
          <MenuItens />
        </PermanentDrawer>
      </Box>
    </>
  );

  const MainContent = (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${Constants.DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        offset={Constants.DRAWER_WIDTH}
        handleMenuButton={() => setMobileOpen(!mobileOpen)}
      />

      {SideBar}

      {MainContent}
    </Box>
  );
}

export default LayoutPage;
