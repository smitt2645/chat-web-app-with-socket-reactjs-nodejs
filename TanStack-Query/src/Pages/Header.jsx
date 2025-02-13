import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles"; // Import from @mui/styles

const useStyles = makeStyles(() => ({
  linkSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  links: {
    padding: "5px",
    color: "red",
    textDecoration: "none",
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.linkSection}>
        <Typography variant="h6">My Application</Typography>
        <Box>
          <NavLink className={classes.links} to={"/home"}>
            Home
          </NavLink>
          <NavLink className={classes.links} to={"/about"}>
            About
          </NavLink>
          <NavLink className={classes.links} to={"/contact"}>
            Contact
          </NavLink>
          <NavLink className={classes.links} to={"/chat"}>
            Chat
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
