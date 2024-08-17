import React from "react";
import { Grid, Button } from "@mui/material";
import FriendData from "../TempData/FriendData";
import { TopBar, MiniProfile } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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
        <Grid item>
          <h2 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
            Your new connections...
          </h2>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#B399DD",
              color: "#grey",
              fontWeight: "bold",
              textTransform: "none",
              marginRight: "10px",
              "&:hover": { backgroundColor: "#996FD6" },
            }}
            onClick={() => navigate("/friends-list")}
          >
            UrQuties
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#B399DD",
              color: "#grey",
              fontWeight: "bold",
              textTransform: "none",
              marginLeft: "10px",
              "&:hover": { backgroundColor: "#996FD6" },
            }}
            onClick={() => navigate("/add-friend")}
          >
            Find Friends
          </Button>
        </Grid>

        {FriendData.map((friend, index) => (
          <Grid item xs={12} key={index} sx={{ textAlign: "center" }}>
            <MiniProfile friend={friend} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
