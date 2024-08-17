import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from '@mui/icons-material/Home';

const paths = ["/home", "/no-page", "/profile"];

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
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1100 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={selectedPage}
          onChange={handleChange}
          sx={{
            bgcolor: '#e3d9ea',
            '& .Mui-selected': {
              color: '#996FD6', // Color of the selected BottomNavigationAction
            },
            '& .MuiBottomNavigationAction-icon': {
              color: '#996FD6', // Icon color for unselected BottomNavigationAction
            },
            '& .Mui-selected .MuiBottomNavigationAction-icon': {
              color: '#996FD6', // Icon color for selected BottomNavigationAction
            }
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon sx={{ color: '#996FD6' }}/>} />
          <BottomNavigationAction label="No Page" icon={<FavoriteIcon sx={{ color: '#996FD6' }}/>} />
          <BottomNavigationAction label="Profile" icon={<AccountBoxIcon sx={{ color: '#996FD6' }}/>} />
        </BottomNavigation>
      </Box>
      <Outlet />
    </>
  );
}

export default NavBar;
