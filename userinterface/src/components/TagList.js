import { Box, Chip } from "@mui/material";
import React from "react";

const TagList = ({ tagData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        maxWidth: 200,
      }}
    >
      {tagData.map((tag, index) => (
        <Chip key={index} label={tag} variant="outlined" />
      ))}
    </Box>
  );
};

export default TagList;
