const BASE_URL = "http://localhost:8000";

// ADD FRIEND

export const addFriend = async (currentUserUsername, newFriendUsername) => {
  try {
    const payload = {
      currentUserUsername: currentUserUsername,
      newFriendUsername: newFriendUsername,
    };

    const response = await fetch(`${BASE_URL}/add_friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const res = await response.json();
      console.log("Add Friend Response:", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to Add Friend:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error Adding Friend in:", error.message);
    throw error;
  }
};

// REMOVE FRIEND

export const removeFriend = async (currentUserUsername, friendUsername) => {
    try {
        const payload = {
            currentUserUsername: currentUserUsername,
            friendUsername: friendUsername
        }

    const response = await fetch(`${BASE_URL}/remove_friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const res = await response.json();
      console.log("Removing Friend Response", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to Remove Friend:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error Removing Friend:", error.message);
    throw error;
  }
};

// GET FRIENDS
// Returns a List of Friends for the Current User

export const getFriends = async (currentUserUsername) => {
  try {
    const response = await fetch(
      `${BASE_URL}/get_friends/${currentUserUsername}`
    );
    if (response.ok) {
      const res = await response.json();
      console.log("Get Friends Response", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to Get Friends:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error Getting Friends:", error.message);
    throw error;
  }
};

export const getRecommendedFriends = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/recommended_friends}`
        );
        if (response.ok) {
            const res = await response.json();
            console.log("Get Recommended Friends Response:", res);
            return res;
        } else {
            const errorData = await response.json();
            console.error("Failed to Get Recommended Friends:", errorData.error);
            throw new Error(errorData.error)
        }
        
    }
    catch(error) {
    console.error("Error Getting Recommended Friends:", error.message);
    }
}

export const getUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/get_user_details/${username}`);
    if (response.ok) {
      const res = await response.json();
      console.log("Get User Response", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to Get User:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error Getting User:", error.message);
    throw error;
  }
};

// LOGIN
// Checks a users authorisation if they are allowed, 200 is permitted

export const login = async (email, password) => {
  try {
    const payload = {
      email: email,
      password: password,
    };

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const res = await response.json();
      console.log("Login response: ", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to login:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Create Account

export const createAccount = async (
  username,
  password,
  email,
  name,
  degree = null,
  dateStarted = null
) => {
  try {
    const payload = {
      username: username,
      password: password,
      email: email,
      name: name,
      degree: degree,
      dateStarted: dateStarted,
    };

    const response = await fetch(`${BASE_URL}/createaccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const res = await response.json();
      console.log("Create Account Response", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to create account:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error creating account:", error.message);
    throw error;
  }
};

// Add Course

export const addCourse = async (username, courseCode) => {
  try {
    const payload = {
      currentUserUsername: username,
      courseCode: courseCode,
    };

    const response = await fetch(`${BASE_URL}/add_course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const res = await response.json();
      console.log("Add Course Response", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to add course:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error adding course:", error.message);
    throw error;
  }
};

// Remove Course

export const removeCourse = async (username, courseCode) => {
  try {
    const payload = {
      currentUserUsername: username,
      courseCode: courseCode,
    };

    const response = await fetch(`${BASE_URL}/remove_course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const res = await response.json();
      console.log("Remove Course Response", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to remove course:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error Removing Course:", error.message);
    throw error;
  }
};
