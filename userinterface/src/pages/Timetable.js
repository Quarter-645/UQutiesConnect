import React, { useState, useMemo } from "react";
import { Grid, MenuItem, Select, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FriendData, CourseData, TimetableData } from '../TempData/TimetableData';

const Timetable = () => {
  const [selectedFriend, setSelectedFriend] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const getCourseTimes = (courseId) => {
    // Filter timetable data for the selected course
    return TimetableData.filter((item) => item.courseId === courseId);
  };

  const handleFriendChange = (event) => {
    setSelectedFriend(event.target.value);
    setSelectedCourse("");
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const timetableData = useMemo(() => selectedCourse ? getCourseTimes(selectedCourse) : [], [selectedCourse]);

  // Create a lookup for timetable data
  const timetableMap = useMemo(() => {
    return timetableData.reduce((acc, time) => {
      const key = `${time.day}-${time.start}`;
      acc[key] = time;
      return acc;
    }, {});
  }, [timetableData]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = [...Array(13).keys()].map((hour) => hour + 8);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3} sx={{ padding: "20px", paddingBottom: "60px", backgroundColor: "#FCF8FF", minHeight: "100vh" }}>
      <Grid item sx={{ textAlign: "center" }}>
        <h3 style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6" }}>⟡Timetable⟡</h3>
        <Select value={selectedFriend} onChange={handleFriendChange} displayEmpty sx={{ width: 200, margin: "10px" }}>
          <MenuItem value="" disabled>Select Friend</MenuItem>
          {FriendData.map((friend) => (
            <MenuItem key={friend.id} value={friend.id}>{friend.name}</MenuItem>
          ))}
        </Select>
        <Select value={selectedCourse} onChange={handleCourseChange} displayEmpty sx={{ width: 200, margin: "10px" }}>
          <MenuItem value="" disabled>Select Course</MenuItem>
          {selectedFriend && CourseData.filter((course) => course.friendId === selectedFriend).map((course) => (
            <MenuItem key={course.id} value={course.id}>{course.code}</MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="timetable">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6", borderRight: "1px solid #D3D3D3" }}></TableCell>
                {days.map((day) => (
                  <TableCell key={day} align="center" style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6", borderRight: "1px solid #D3D3D3" }}>
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {hours.map((hour) => (
                <TableRow key={hour}>
                  <TableCell component="th" scope="row" style={{ fontFamily: "Baloo Bhaijaan", color: "#996FD6", borderRight: "1px solid #D3D3D3" }}>
                    {`${hour}:00`}
                  </TableCell>
                  {days.map((day) => {
                    const key = `${day}-${hour}`;
                    const time = timetableMap[key];
                    return (
                      <TableCell key={day} align="center" style={{ borderRight: "1px solid #D3D3D3" }}>
                        <Paper
                          sx={{
                            height: "50px",
                            backgroundColor: time ? time.color : "#FFF",
                            color: "#000",
                            padding: "5px",
                            boxShadow: "none", // Remove shadows
                          }}
                        >
                          {time ? (
                            <>
                              <div> {time.courseId}</div>
                              <div>{time.code}</div>
                              <div>{time.location}</div>
                            </>
                          ) : (
                            <div>&nbsp;</div>
                          )}
                        </Paper>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Timetable;
