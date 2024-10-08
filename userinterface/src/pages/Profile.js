import React, { useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";
import UserData from "../TempData/UserData";
import userProfile from "../TempData/UserData";
import { AddTag } from "../components";
import TagList from "../components/TagList";
import CourseCodes from "../TempData/CourseCodes";
import ClubNames from "../TempData/ClubNames";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { username } = location.state || {};
  console.log("username", username);

  const userClubs = UserData.map((user) => {
    if (user.username === "not_holly") {
      return user.clubs;
    }
    return null;
  }).filter((clubs) => clubs !== null);

  const userCourses = UserData.map((user) => {
    if (user.username === "not_holly") {
      return user.courses;
    }
    return null;
  }).filter((courses) => courses !== null);

  // const [isUser, setIsUser] = useState(UserData.username === "not_holly");
  const [isUser, setIsUser] = useState(true);

  const handleFriendClick = () => {
    navigate("/home");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      style={{
        padding: "20px",
        paddingBottom: "60px",
        backgroundColor: "#FCF8FF",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Grid item style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Baloo Bhaijaan",
            fontSize: "2.5rem",
            color: "#996FD6",
          }}
        >
          ⟡UQutie⟡
        </h1>
        <Avatar
          alt="User Avatar"
          src={userProfile.profilePicture}
          style={{ width: 100, height: 100, margin: "0 auto" }}
        />
        <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#B399DD" }}>
          {/* {userProfile.username} */}
          username
        </h3>
        <Button
          variant="contained"
          onClick={handleFriendClick}
          sx={{
            backgroundColor: "#B399DD",
            color: "#grey",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#996FD6" },
          }}
        >
          Friends
        </Button>
      </Grid>

      <Grid item>
        <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
          Current Courses:
        </h3>
        {isUser ? (
          <AddTag tagData={CourseCodes} userTags={userCourses} />
        ) : (
          <TagList tagData={CourseCodes} />
        )}
      </Grid>

      <Grid item>
        <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
          Current Clubs:
        </h3>
        {isUser ? (
          <AddTag tagData={ClubNames} userTags={userClubs} />
        ) : (
          <TagList tagData={ClubNames} />
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;
