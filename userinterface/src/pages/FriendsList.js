import React from "react";
import { Grid, Avatar, Button } from "@mui/material";
import FriendData from "../TempData/FriendData";
import { TopBar } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (username) => {
    console.log("username home", username);
    navigate("/friend", { state: { username } });
  };

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
          backgroundColor: "#FCF8FF",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Grid item xs={8}>
          <h2 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
            Your old connections...
          </h2>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#B399DD",
              color: "#grey",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#996FD6" },
            }}
            onClick={() => navigate("/home")}
          >
            Find UQuties
          </Button>
        </Grid>
        {FriendData.map((friend, index) => (
          <Grid item xs={12} key={index} sx={{ textAlign: "center" }}>
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
              onClick={() => handleClick(friend.username)}
            >
              {friend.name} through {friend.course}
            </Button>
            <Avatar
              alt={`${friend.name}'s Avatar`}
              src={friend.avatarUrl}
              sx={{ width: 100, height: 100, margin: "0 auto" }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
