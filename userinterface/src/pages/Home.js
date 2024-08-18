import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import FriendData from "../TempData/FriendData";
import { TopBar, MiniProfile } from "../components";
import { useNavigate } from "react-router-dom";
import {
  useGetFriendsByUsername,
  useGetUserByUsername,
  useGetRecommendedFriends,
} from "../api/Hooks";

const userID = "user";

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const titles = ["Your new connections...", "Your old connections..."];
  const buttons = ["UrQuties", "Find UQuties"];

  const { friendsData } = useGetFriendsByUsername(userID);
  const { recommendedFriendsData } = useGetRecommendedFriends;
  // const { userData } = useGetUserByUsername("name1");

  console.log("friendsData", friendsData);
  console.log("recommendedFriendsData", recommendedFriendsData);
  // console.log("userData", userData);

  const handleClick = () => {
    // navigate("/add-friend");
    // change FriendData
    setIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
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
        <Grid item>
          <h2 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
            {titles[index]}
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
            onClick={handleClick}
          >
            {buttons[index]}
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
            onClick={handleClick}
          >
            Add Friends
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
