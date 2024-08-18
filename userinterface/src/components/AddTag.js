import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddTag = ({ tagData, userTags }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagChange = (event) => {
    setTagInput(event.target.value);
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (
      trimmedTag &&
      tagData.includes(trimmedTag) &&
      !tags.includes(trimmedTag)
    ) {
      setTags((prevTags) => [...prevTags, trimmedTag]);
      setTagInput("");
    } else {
      alert("Tag does not exist or is already added");
    }
  };

  const deleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField
            id="course-input"
            label="Course code..."
            variant="standard"
            value={tagInput}
            onChange={handleTagChange}
          />
        </Grid>
        <Grid item>
          <IconButton
            aria-label="add tag"
            onClick={addTag}
            style={{ fontFamily: "Baloo Bhaijaan", color: "#B399DD" }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <List>
        {tags.map((tag, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                aria-label="delete tag"
                onClick={() => deleteTag(tag)}
                style={{ color: "#E3E3E3" }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={tag} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default AddTag;
