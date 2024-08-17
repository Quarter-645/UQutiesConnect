import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from '@mui/icons-material/Add';

const paths = ["/home", "/add-friend", "/no-page", "/profile"];

function NavBar() {
  const [selectedPage, setSelectedPage] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const newPage = paths.indexOf(currentPath);
    if (newPage !== -1) {
      setSelectedPage(newPage);
    }
  }, [location.pathname]);

  const handleChange = (event, newPage) => {
    setSelectedPage(newPage);
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
          <BottomNavigationAction label="Add Friend" icon={<AddIcon/>}/>
          <BottomNavigationAction label="No Page" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} />
        </BottomNavigation>
      </Box>
      <Outlet />
    </>
  );
}

export default NavBar;
