import { Chip } from "@mui/material";
import React from "react";

const TagList = ({ tagData }) => {
  return (
    <>
      {tagData.map((tag, index) => (
        <Chip key={index} label={tag} variant="outlined" />
      ))}
    </>
  );
};

export default TagList;
