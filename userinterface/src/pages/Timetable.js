import React, { useState } from "react";
import {
  Grid,
  Button,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CourseData from "../TempData/CourseCodes"; // Example data
import FriendData from "../TempData/FriendData"; // Example data

const Timetable = () => {
  const [selectedFriend, setSelectedFriend] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const navigate = useNavigate();

  // Example function to handle timetable logic
  const getCourseTimes = (course) => {
    // Replace with actual logic to get course times
    return [
      {
        day: "Monday",
        start: 8,
        end: 10,
        color: "#FFB6C1",
        code: "CS101",
        location: "Building A",
      },
      // Add other times here
    ];
  };

  const handleFriendChange = (event) => {
    setSelectedFriend(event.target.value);
    // Reset course selection when friend changes
    setSelectedCourse("");
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const timetableData = selectedCourse ? getCourseTimes(selectedCourse) : [];

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      style={{
        padding: "20px",
        paddingBottom: "60px",
        backgroundColor: "#FCF8FF",
        minHeight: "100vh",
      }}
    >
      <Grid item style={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}
        >
          ⟡Timetable⟡
        </Typography>
        <Select
          value={selectedFriend}
          onChange={handleFriendChange}
          displayEmpty
          sx={{ width: 200, margin: "10px" }}
        >
          <MenuItem value="" disabled>
            Select Friend
          </MenuItem>
          {FriendData.map((friend) => (
            <MenuItem key={friend.id} value={friend.id}>
              {friend.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedCourse}
          onChange={handleCourseChange}
          displayEmpty
          sx={{ width: 200, margin: "10px" }}
        >
          <MenuItem value="" disabled>
            Select Course
          </MenuItem>
          {selectedFriend &&
            CourseData.filter(
              (course) => course.friendId === selectedFriend
            ).map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.code}
              </MenuItem>
            ))}
        </Select>
      </Grid>

      <Grid item container spacing={1} style={{ width: "100%" }}>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <Grid item xs={2} key={day}>
            <Typography
              variant="h6"
              style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}
            >
              {day}
            </Typography>
            {[...Array(12).keys()].map((hour) => (
              <Paper
                key={hour}
                style={{
                  height: "50px",
                  backgroundColor:
                    timetableData.find(
                      (time) => time.day === day && time.start === hour + 8
                    )?.color || "#FFF",
                  color: "#000",
                  marginBottom: "5px",
                  padding: "5px",
                }}
              >
                {timetableData.find(
                  (time) => time.day === day && time.start === hour + 8
                ) ? (
                  <>
                    <div>
                      {
                        timetableData.find(
                          (time) => time.day === day && time.start === hour + 8
                        ).code
                      }
                    </div>
                    <div>
                      {
                        timetableData.find(
                          (time) => time.day === day && time.start === hour + 8
                        ).location
                      }
                    </div>
                  </>
                ) : (
                  <div>&nbsp;</div>
                )}
              </Paper>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Timetable;
