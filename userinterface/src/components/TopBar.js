import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import Logo from "../assets/UQutieLogo.png";

const TopBar = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ mb: 1, boxShadow: "none" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e3d9ea",
            height: "70px",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="UQutie Logo"
            sx={{ width: 60, height: 50, borderRadius: 1 }}
          />
          <Box
            sx={{
              marginLeft: 1,
              fontSize: "1.5 rem",
              fontFamily: "Baloo Bhaijaan",
              color: "#996FD6",
            }}
          >
            UQuties Connect
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
