import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const MenuItemTemplate = ({ title, icon, submenus }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        sx={[
          {
            margin: "auto",
            borderRadius: 2,
            width: 230,
            height: 50,
            backgroundColor: "#11192A",
          },

          {
            "&:hover": {
              backgroundColor: "rgba(195,195,195,0.45)",
            },
          },
        ]}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ color: "white", opacity: 0.7, minWidth: 30 }}>
          {icon}
        </ListItemIcon>
        <ListItemText sx={{ opacity: 0.75 }} primary={title} />
        {open ? (
          <ExpandLess sx={{ opacity: 0.7, fontSize: 20 }} />
        ) : (
          <ExpandMore sx={{ opacity: 0.7, fontSize: 20 }} />
        )}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {submenus.map((submenu) => {
            return (
              <ListItemButton
                component={Link}
                to={`/${submenu.path}`}
                sx={[
                  {
                    margin: "auto",
                    borderRadius: 2,
                    width: 200,
                    height: 35,
                    backgroundColor: "#11192A",
                  },

                  {
                    "&:hover": {
                      backgroundColor: "rgba(195,195,195,0.45)",
                    },
                  },
                ]}
              >
                <ListItemIcon
                  sx={{ color: "white", opacity: 0.7, minWidth: 30 }}
                >
                  {submenu.icon}
                </ListItemIcon>
                <ListItemText sx={{ opacity: 0.75, }} primary={submenu.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default MenuItemTemplate;
