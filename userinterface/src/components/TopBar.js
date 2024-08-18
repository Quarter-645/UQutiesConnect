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
            alignItems: "center", // Center vertically
            backgroundColor: "#e3d9ea",
            height: "70px", // Adjust the height here
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="UQutie Logo"
            sx={{ width: 60, height: 60, borderRadius: 1 }} // Adjust size as needed
          />
          <Box
            sx={{
              marginLeft: 1, // Space between image and text
              fontSize: "1.5 rem", // Adjust font size as needed
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
