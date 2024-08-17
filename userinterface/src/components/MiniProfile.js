import { Avatar, Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const MiniProfile = ({ friend }) => {
  const navigate = useNavigate();

  const handleClick = (username) => {
    console.log("username home", username);
    navigate("/friend", { state: { username } });
  };

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "#FCF8FF",
        height: 200,
        width: 300,
        boxShadow: "0px 1px 1px #A18DB5",
      }}
    >
      <CardActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          variant="Outlined"
          sx={{
            backgroundColor: "#EFE9F3",
            color: "#A98BDA",
            textTransform: "none",
            fontFamily: "Baloo Bhaijaan",
            fontSize: "1rem",
            mb: 2,
            width: "100%",
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
          onClick={() => handleClick(friend.username)}
        >
          {friend.name} through {friend.course}
        </Button>
      </CardActions>
      <CardContent>
        <Avatar
          alt={`${friend.name}'s Avatar`}
          src={friend.avatarUrl}
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
      </CardContent>
    </Card>
  );
};

export default MiniProfile;
