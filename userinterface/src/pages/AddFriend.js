import React, { useState } from "react";
import {
  Avatar,
  ListItemText,
  List,
  ListItem,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import userProfile from "../TempData/UserData";
import { Logo } from "../components";
import { removeFriend, addFriend, getFriends } from "../api/api";

const Search = () => {
  const [usernames, setUsername] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");

  const handleFriendSearch = (event) => {
    setUsernameInput(event.target.value);
  };

  // const possibleUsernames = usernameArray.map((user) => user.username);

  const addFriend = () => {
    const ASSUMED_USERNAME = "dogs"
    
    const trimmedUsername = usernameInput.trim();

    const existingFriends = getFriends("dogs");

    try {
      if (existingFriends.includes(trimmedUsername)) {
        removeFriend(ASSUMED_USERNAME, trimmedUsername);
      } else {
        addFriend(ASSUMED_USERNAME, trimmedUsername);
      }
    } catch (error) {
      console.error("Error setting friend state:", error.message);
    }
    

    if (usernames.includes(trimmedUsername)) {
      alert("Friend is already added.");
    } else if (
      trimmedUsername &&
      userProfile.some((user) => user.username === trimmedUsername)
    ) {
      setUsername((prevUsernames) => [...prevUsernames, trimmedUsername]);
      setUsernameInput("");
    } else {
      alert("Username does not exist.");
    }
    // console.log("usernames", usernames);
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
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
        <Logo />
        <h1
          style={{
            fontFamily: "Baloo Bhaijaan",
            fontSize: "2.5rem",
            color: "#996FD6",
          }}
        >
          ⟡Add a UQutie⟡
        </h1>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <TextField
              id="username-input"
              label="Username..."
              variant="standard"
              value={usernameInput}
              onChange={handleFriendSearch}
            />
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Add Friend"
              onClick={addFriend}
              style={{ fontFamily: "Baloo Bhaijaan", color: "#B399DD" }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <List>
          {usernames.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Search;
