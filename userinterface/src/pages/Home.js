import React from "react";
import { AppBar, Toolbar, Box, Grid, Avatar, Button } from "@mui/material";
import Logo from "../assets/UQutieLogo.png";
import FriendData from "../TempData/FriendData"; // Import FriendData
import { TopBar } from "../components";

const Home = () => {
  return (
    <>
      <TopBar />
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{
          padding: "20px",
          paddingBottom: "60px",
          backgroundColor: "#FCF8FF", // Background color
          backgroundSize: "cover", // Ensure the image covers the container
          backgroundPosition: "center", // Center the image
          minHeight: "100vh", // Ensure full viewport height
        }}
      >
        <Grid item>
          <h2 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
            Your new connections...
          </h2>
        </Grid>
        {FriendData.map((friend, index) => (
          <Grid item key={index} sx={{ textAlign: "center" }}>
            <Button
              variant="Outlined"
              sx={{
                backgroundColor: "#EFE9F3",
                color: "#A98BDA",
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
