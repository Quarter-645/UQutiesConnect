// Example Friend Data
export const FriendData = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Tina" },
    { id: "4", name: "Adam" },
    // Add more friends as needed
];

  // Example Course Data
export const CourseData = [
    { id: "CSSE1001", code: "CSSE1001", friendId: "1"},
    { id: "CSSE1001", code: "CSSE1001", friendId: "4"},
    { id: "CSSE2002", code: "CSSE2002", friendId: "1" },
    { id: "CSSE2010", code: "CSSE2010", friendId: "2" },
    { id: "MATH1061", code: "MATH1061", friendId: "3" },
    { id: "MATH1061", code: "MATH1061", friendId: "4" },
    // Add more courses as needed
];

// Example Timetable Data
export const TimetableData = [
    { courseId: "CSSE1001", day: "Mon", start: 8, end: 10, color: "#FFB6C1", location: "49-300" },
    { courseId: "CSSE1001", day: "Wed", start: 12, end: 13, color: "#FFB6C1", location: "49-300" },
    { courseId: "CSSE2002", day: "Wed", start: 10, end: 12, color: "#C1FFC1", location: "49-201" },
    { courseId: "CSSE2002", day: "Fri", start: 14, end: 15, color: "#C1FFC1", location: "49-201" },
    { courseId: "CSSE2010", day: "Thu", start: 11, end: 13, color: "#C1C1FF", location: "47" },
    { courseId: "CSSE2010", day: "Mon", start: 16, end: 17, color: "#C1C1FF", location: "47" },
    { courseId: "MATH1061", day: "Fri", start: 8, end: 10, color: "#FFDCB6", location: "50" },
    { courseId: "MATH1061", day: "Thu", start: 11, end: 12, color: "#FFDCB6", location: "50" },
    // Add more timetable entries as needed
];
