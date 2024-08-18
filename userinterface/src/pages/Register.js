import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Logo, Password } from "../components";
import { createAccount } from "../api/api";

const Register = () => {
  const navigate = useNavigate();
  const initialFormData = {
    email: null,
    password: null,
    username: null,
    name: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  // const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState(false);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username, name } = formData;
    try {
      var response = await createAccount(username, password, email, name);
      console.log("Form Data:", formData);
      setSuccess(true);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to create account:", error);
      alert(`Registration failed! ${error}`);
      setSuccess(false);
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
            {/* <Logo /> */}
            <h2
              style={{
                fontFamily: "Baloo Bhaijaan",
                color: "#996FD6",
                marginTop: "70px",
              }}
            >
              Register
            </h2>
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
          <Grid item xs={12} marginBottom={"60px"}>
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
