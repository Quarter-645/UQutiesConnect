import React from "react";

//
import { Box, ThemeProvider } from '@mui/material'
import { testTheme } from '../testTheme/testTheme.js'

export const MuiTest = () => {
  return (
    <Box sx={{ 
      height: '300px',
      width: {
        xs: 100,
        sm: 200,
        md: 300,
        lg: 400,
        xl: 500,
      },
      bgcolor: 'secondary.main',
    }}></Box>
  )
}

const Home = () => {
  return (
    <ThemeProvider theme={testTheme}>
      <MuiTest>
  <div className='App'>Home</div>;
  </MuiTest>
  </ThemeProvider>
  )
};

export default Home;

