import React from "react";
import { AppBar, Toolbar, Box, Grid, Avatar, Button, ThemeProvider } from "@mui/material";
import Logo from "../assets/UQutieLogo.png";
import FriendData from "../TempData/FriendData"; // Import FriendData


const Home = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ mb: 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#EFE9F3", // Change color here
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="UQutie Logo"
            sx={{ width: 100, height: 100, borderRadius: 1 }}
          />
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{
          padding: "20px",
          backgroundColor: "#FCF8FF", // Background color
          backgroundSize: "cover", // Ensure the image covers the container
          backgroundPosition: "center", // Center the image
          minHeight: "100vh", // Ensure full viewport height
        }}
      >
        <Grid item>
          <h2 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
            You're connected to...
          </h2>
        </Grid>
        {FriendData.map((friend, index) => (
          <Grid item key={index} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#EFE9F3",
                color: "#B399DD",
                textTransform: "none",
                fontFamily: "Baloo Bhaijaan",
                fontSize: "1rem",
                mb: 2,
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              {friend.name} through {friend.course}
            </Button>
            <Avatar
              alt={`${friend.name}'s Avatar`}
              src={friend.avatarUrl} // Use friend's avatar URL
              sx={{ width: 100, height: 100, margin: "0 auto" }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;

