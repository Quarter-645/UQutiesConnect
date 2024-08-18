import UserData from "../TempData/UserData";

import Logo from "../assets/UQutieLogo.png";

// import Autocomplete from '@mui/material/Autocomplete';


import React, { useState } from "react";
import {Avatar, ListItemText, ListItemAvatar, List, ListItem, IconButton, 
  TextField, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from '@mui/icons-material/Clear';
import usernameArray from "../TempData/UserData";



const Search = () => {
  const [usernames, setUsernames] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");

  const handleFriendSearch = (event) => {
    setUsernameInput(event.target.value);
  }

  const possibleUsernames = usernameArray.map(user => user.username);

  const addFriend = () => {
    const trimmedUsername = usernameInput.trim();

    if(
      trimmedUsername &&
      possibleUsernames.includes(trimmedUsername) &&
      !usernames.includes(trimmedUsername)
    ) {
      setUsernames((prevUsernames) => [...prevUsernames, trimmedUsername]);
      setUsernameInput("");
    } else {
      alert("Username does not exist or is friend is already added.")
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
      spacing={3}
      style={{
        padding: "20px",
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
          style= {{ width: "100%" }}>
          <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6", textAlign: "center"}}>
          Current Friends:
          </h3>
          <List sx={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            {/* flexWrap: 'wrap', justifyContent: 'center', maxWidth:'100% */}
            {usernames.map((username, index) => (
              <ListItem
              key={index}
              secondaryAction={
                <IconButton
                aria-label="Remove Friend"
                onClick={() => deleteUsername(username)}
                style={{ color: "#900C3F"}}
                >
                  <ClearIcon />
                </IconButton>
              }
              >
                <ListItemAvatar>
                  <Avatar
                    alt="profilepicture"
                    src={usernameInput.profilePictureURL}
                  />
                </ListItemAvatar>
                <ListItemText primary={username} />
              </ListItem>
            ))}
          </List>
          </Grid>

      </Grid>
 

    );
  };
  
  export default Search;
  