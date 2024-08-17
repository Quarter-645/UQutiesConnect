import React, { useState } from 'react';
import { Avatar, ListItemText, List, ListItem, IconButton, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CourseCodes from '../TempData/CourseCodes'; 
import ClubNames from '../TempData/ClubNames';
import userProfile from '../TempData/UserData';

const Profile = () => {
  const [courses, setCourses] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [courseInput, setCourseInput] = useState('');
  const [clubInput, setClubInput] = useState('');

  const handleCourseChange = (event) => {
    setCourseInput(event.target.value);
  };

  const handleClubChange = (event) => {
    setClubInput(event.target.value);
  };

  const addCourse = () => {
    const trimmedCourse = courseInput.trim();
    if (trimmedCourse && CourseCodes.includes(trimmedCourse) && !courses.includes(trimmedCourse)) {
      setCourses((prevCourses) => [...prevCourses, trimmedCourse]);
      setCourseInput(''); // Clear input field after adding
    } else {
      alert("Course does not exist or is already added");
    }
  };

  const addClub = () => {
    const trimmedClub = clubInput.trim();
    if (trimmedClub && ClubNames.includes(trimmedClub) && !clubs.includes(trimmedClub)) {
      setClubs((prevClubs) => [...prevClubs, trimmedClub]);
      setClubInput(''); // Clear input field after adding
    } else {
      alert("Club does not exist or is already added");
    }
  };

  const deleteCourse = (courseToDelete) => {
    setCourses((prevCourses) => prevCourses.filter(course => course !== courseToDelete));
  };

  const deleteClub = (clubToDelete) => {
    setClubs((prevClubs) => prevClubs.filter(club => club !== clubToDelete));
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      style={{ 
        padding: '20px',
        backgroundColor: '#FCF8FF', // Background color
        backgroundSize: 'cover', // Ensure the image covers the container
        backgroundPosition: 'center', // Center the image
        minHeight: '100vh' // Ensure full viewport height
      }}
    >
  <Grid item
    style={{ textAlign: 'center' }} // Center the content inside this Grid item
  >
    <h1 style={{ fontFamily: 'Baloo Bhaijaan', fontSize: '2.5rem', color: '#996FD6' }}>
      ⟡UQutie⟡
    </h1>
    <Avatar 
      alt="User Avatar" 
      src={userProfile.profilePicture} // Use profile picture from userProfile
      style={{ width: 100, height: 100, margin: '0 auto' }} // Center avatar
    />
    <h3 style={{ fontFamily: 'Baloo Bhaijaan', color: '#B399DD' }}>
      {userProfile.username}
    </h3>
  </Grid>

      <Grid item>
        <h3 style={{fontFamily: 'Baloo Bhaijaan', color: '#996FD6' }}>Current Courses:</h3>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              id="course-input"
              label="Course code..."
              variant="standard"
              value={courseInput}
              onChange={handleCourseChange}
            />
          </Grid>
          <Grid item>
            <IconButton aria-label="add course" onClick={addCourse} style={{ fontFamily: 'Baloo Bhaijaan',color: '#B399DD' }}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <List>
          {courses.map((course, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton 
                aria-label="delete course" 
                onClick={() => deleteCourse(course)} 
                style={{ color: '#E3E3E3' }}
              >
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={course} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item>
        <h3 style={{fontFamily: 'Baloo Bhaijaan', color: '#996FD6' }}>Current Clubs:</h3>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <TextField
              id="club-input"
              label="Club name..."
              variant="standard"
              value={clubInput}
              onChange={handleClubChange}
            />
          </Grid>
          <Grid item>
            <IconButton aria-label="add club" onClick={addClub} style={{ color: '#B399DD' }}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        <List>
          {clubs.map((club, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton 
                aria-label="delete club" 
                onClick={() => deleteClub(club)} 
                style={{ color: '#E3E3E3' }}
              >
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={club} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Profile;
