import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Password, Logo } from "../components";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    degree: "",
    dateCommenced: "",
  });
  const [isSuccess, setSuccess] = useState(true);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (event) => {
    console.log("Form Data:", formData);
    event.preventDefault();

    // registration logic

    // assume success
    if (isSuccess) {
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
      sx={{ backgroundColor: "#FCF8FF" }}
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
              id="username"
              label="Username"
              variant="outlined"
              required
              onChange={(event) =>
                handleFieldChange("username", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              required
              onChange={(event) =>
                handleFieldChange("email", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Password handleChange={handleFieldChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              required
              onChange={(event) =>
                handleFieldChange("name", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="degree"
              label="Degree"
              variant="outlined"
              onChange={(event) =>
                handleFieldChange("degree", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="dateCommenced"
              label="Date Commenced"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={(event) =>
                handleFieldChange("dateCommenced", event.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#B399DD",
                color: "grey",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#996FD6" },
              }}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ color: "#996FD6", fontWeight: "bold" }}
              variant="text"
              size="small"
              onClick={() => navigate("/")}
            >
              Back to Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Register;
