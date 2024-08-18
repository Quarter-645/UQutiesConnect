import React from "react";
import { UQuties } from "../assets";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="img"
        sx={{
          height: 100,
          width: 100,
        }}
        alt="UQuties"
        src={UQuties}
      />
      {/* <Box
        component="img"
        sx={{
          height: 100,
          width: 100,
        }}
        alt="UQuties"
        src={UQuties}
      /> */}
      {/* <Typography>UQuties Connect</Typography> */}
    </Box>
  );
};

export default Logo;
