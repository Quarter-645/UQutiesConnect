import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Logo, Password } from "../components";
import { createAccount } from "../api/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    username: null,
    name: null,
  });
  const [isLoginSuccess, setLoginSuccess] = useState(false);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username, name } = formData;
    try {
      var response = await createAccount(username, password, email, name);
      setLoginSuccess(true);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to create account:", error);
      setLoginSuccess(false);
    }
    console.log("Form Data:", formData);

    console.log(response);

    // assume success
    if (isLoginSuccess) {
      navigate("/profile");
    } else {
      alert("Registration failed!");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
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
              label="Username"
              variant="outlined"
              onChange={(event) =>
                handleFieldChange("username", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Password handleChange={handleFieldChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(event) =>
                handleFieldChange("name", event.target.value)
              }
            />
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
            <Button variant="contained" type="submit">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Register;
