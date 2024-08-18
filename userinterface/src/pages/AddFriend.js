import React, { useState, useEffect } from "react";
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
import { getFriends, addFriendCall, removeFriend } from "../api/api";

const Search = () => {
  const USER_USERNAME = "dogs";
  const [usernames, setUsernames] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const friends = await getFriends(USER_USERNAME);
        setUsernames(friends)
        setIsFriend(friends.includes(usernameInput.trim()));
      } catch (error) {
        console.error("Error getting list of friends:", error.message);
      }
    };

    loadFriends()
  }, [USER_USERNAME, usernameInput]);

  const handleFriendSearch = (event) => {
    setUsernameInput(event.target.value);
  };

  const addFriend = async () => {
    const FRIEND_USERNAME = usernameInput.trim();

    if (isFriend) {
      alert("Already friends with this user.");
    } else {
      addFriendCall(USER_USERNAME, FRIEND_USERNAME);
    }
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
