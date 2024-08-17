import React from "react";
import { Avatar, ListItemText, List, ListItem, Grid } from "@mui/material";
import FriendData from '../TempData/FriendData';

const FriendProfile = ({ friendProfile }) => {
    const { username, profilePicture, courses, clubs } = friendProfile;

    return (
    <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={3}
    style={{
        padding: "20px",
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
        alt="Friend Avatar"
        src={profilePicture}
        style={{ width: 100, height: 100, margin: "0 auto" }}
        />
        <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#B399DD" }}>
            {username}
        </h3>
    </Grid>

    <Grid item>
        <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
        Current Courses:
        </h3>
        <List>
        {courses.map((course, index) => (
            <ListItem key={index}>
            <ListItemText primary={course} />
            </ListItem>
        ))}
        </List>
    </Grid>

    <Grid item>
        <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
        Current Clubs:
        </h3>
        <List>
        {clubs.map((club, index) => (
            <ListItem key={index}>
            <ListItemText primary={club} />
            </ListItem>
        ))}
        </List>
        </Grid>
    </Grid>
    );
};

export default FriendProfile;
