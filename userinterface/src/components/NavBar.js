import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function NavBar({ pages, onSelectPage }) {
  const [selectedPage, setSelectedPage] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newPage) => {
    setSelectedPage(newPage);
    const paths = ["/home", "/no-page", "/login"];
    navigate(paths[newPage]);
  };

  return (
    <>
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={selectedPage}
          onChange={handleChange}
        >
          <BottomNavigationAction label="Home" icon={<RestoreIcon />} />
          <BottomNavigationAction label="No Page" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Login" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
      <Outlet />
    </>
  );
}

export default NavBar;
