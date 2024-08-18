import React, { useState, useEffect } from "react";
import {
  Avatar,
  ListItemText,
  List,
  ListItem,
  IconButton,
  TextField,
  Grid,
  ListItemAvatar
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
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
        setIsFriend(friends.includes(usernameInput.trim()));
      } catch (error) {
        console.error("Error getting list of friends:", error.message);
      }
    };
    
    // Only load friends when usernameInput changes
    if (usernameInput.trim()) {
      loadFriends();
    }
  }, [USER_USERNAME, usernameInput]);

  const handleFriendSearch = (event) => {
    setUsernameInput(event.target.value);
  };

  const addFriend = async () => {
    const FRIEND_USERNAME = usernameInput.trim();

    if (isFriend) {
      removeFriend(USER_USERNAME, FRIEND_USERNAME);
    } else if (
      FRIEND_USERNAME &&
      userProfile.some((user) => user.username === FRIEND_USERNAME)
    ) {
      setUsernames((prevUsernames) => [...prevUsernames, FRIEND_USERNAME]);
      setUsernameInput("");
    } else {
      alert("Username does not exist.");
    }
  }
  
  const deleteUsername = (usernameToDelete) => {
    setUsernames((prevUsernames) => 
    prevUsernames.filter((username) => username !== usernameToDelete)
  );

   //const user = usernameArray.find(user => user.username == username);
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
        <Grid
        item
        justifyContent="center"
        style={{ textAlign: "center"}}
        >
          <h1
          style={{
            fontFamily: "Baloo Bhaijaan",
            fontSize: "2.5rem",
            color: "#996FD6",
          }}
          >
            ⟡Add a UQutie⟡
          </h1>
          <Grid container spacing={3} alignItems="center" justifyContent="center">
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
              style={{ fontFamily: "Baloo Bhaijaan", color: "#B399DD"
               }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
          </Grid>
          <Grid 
          item
          >
          <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6", textAlign: "center"}}>
          Current Friends:
          </h3>
          <List sx={{ padding: 0 }}>
            {usernames.map((username, index) => (
              <ListItem
              key={index}
              secondaryAction={
                <IconButton
                aria-label="Remove Friend"
                onClick={() => deleteUsername(username)}
                style={{ color: "#900C3F" }}
                >
                  <ClearIcon />
                </IconButton>
              }>
                <ListItemAvatar>
                  <Avatar
                    alt="profilepicture"
                    src={usernameInput.profilePictureURL}
                  />
                </ListItemAvatar>
                <ListItemText primary={username} 
                primaryTypographyProps= {{style: { textAlign: 'center'}}}/>
              </ListItem>
            ))}
          </List>
          </Grid>
      </Grid>
  );
};

export default Search;
