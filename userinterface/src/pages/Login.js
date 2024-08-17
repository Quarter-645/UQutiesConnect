import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Password, Logo } from "../components";
import { login } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: null,
    password: null
  });
  const [isLoginSuccess, setLoginSuccess] = useState(false);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    const { email, password } = formData;

    try {
      var response = await login(email, password);
      setLoginSuccess(true);
      navigate("/home");
    } catch (error) {
      console.error("Failed to login:", error);
      setLoginSuccess(false);
    }

    // assume success
    // if (isLoginSuccess) {
    //   navigate("/home");
    // } else {
    //   alert("Login failed!");
    // }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: '#FCF8FF' }} 
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Logo />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) =>
                handleFieldChange("email", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Password handleChange={handleFieldChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" 
            sx={{ 
              backgroundColor: '#B399DD', 
              color: '#grey', 
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#996FD6' }}}>
              Confirm
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
            sx={{color: '#996FD6', fontWeight: 'bold'}}
              variant="text"
              size="small"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
