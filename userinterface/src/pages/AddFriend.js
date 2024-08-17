import UserData from "../TempData/UserData";

import Logo from "../assets/UQutieLogo.png";

// import Autocomplete from '@mui/material/Autocomplete';


import React, { useState } from "react";
import {Avatar, ListItemText, List, ListItem, IconButton, 
  TextField, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import usernameArray from "../TempData/UserData";



const Search = () => {
  const [usernames, setUsername] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");

  const handleFriendSearch = (event) => {
    setUsernameInput(event.target.value);
  }

  const addFriend = () => {
    const trimmedUsername = usernameInput.trim();
    
    if(
      trimmedUsername &&
      usernameArray.includes(trimmedUsername) &&
      !usernames.includes(trimmedUsername)
    ) {
      setUsername((prevUsernames) => [...prevUsernames, trimmedUsername]);
      setUsernameInput("");
    } else {
      alert("Username does not exist or is friend is already added.")
    }
  }
  
  const deleteUsername = (usernameToDelete) => {
    setUsername((prevUsernames) => 
    prevUsernames.filter((username) => username !== usernameToDelete)
  );
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
          <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>
          Current Friends:
          </h3>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <TextField
              id="username-input"
              label="Username..."
              variant="standard"
              value={usernameInput}
              onChange={handleFriendSearch}
              />
              {console.log("usernameInput", usernameInput)}
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
            {usernames.map((username, index) => (
              <ListItem
              key={index}
              secondaryAction={
                <IconButton
                aria-label="Remove Friend"
                onClick={() => deleteUsername(username)}
                style={{ color: "#E3E3E3"}}
                >
                  <DeleteIcon />
                </IconButton>
              }
              >
                <ListItemText primary={username} />
              </ListItem>
            ))}
          </List>
        </Grid>

      </Grid>
 

    );
  };
  
  export default Search;
  