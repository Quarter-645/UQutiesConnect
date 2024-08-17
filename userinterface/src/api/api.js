const BASE_URL = "http://localhost:8000/";

// ADD FRIEND

export const addFriend = async (currentUserUsername, newFriendUsername) => {
    try {
        payload = {
            currentUserUsername: currentUserUsername,
            newFriendUsername: newFriendUsername
        }

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
}

// REMOVE FRIEND

export const removeFriend = async (currentUserUsername, friendUsername) => {
    try {
        payload = {
            currentUserUsername: currentUserUsername,
            newFriendUsername: friendUsername
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
}

// GET FRIENDS

export const getFriends = async (currentUserUsername) => {
    try {
        const response = await fetch(`${BASE_URL}/get_friends?username=${currentUserUsername}`);
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
}

// RECIPES

export const fetchRecipes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get_recipe/`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch recipes:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    return null;
  }
};

export const fetchRecipesByAuthor = async (author) => {
  try {
    const response = await fetch(`${BASE_URL}/get_recipe/?author=${author}`);
    if (response.ok) {
    //   console.log("response", await response.json());
      return await response.json();
    } else {
      console.error("Failed to fetch recipes:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    return null;
  }
};

export const fetchRecipeById = async (recipeID) => {
  try {
    const response = await fetch(`${BASE_URL}/get_recipe/${recipeID}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch recipe:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    return null;
  }
};

export const toggleFavourite = async (recipeID, userID, isFavourite) => {
  try {
    const response = await fetch(`${BASE_URL}/get_recipe/${recipeID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
        user_likes_recipe: isFavourite,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to update favorite status:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating favorite status:", error.message);
    return null;
  }
};

// CREATE RECIPE

export const postRecipe = async (recipeData) => {
  try {
    const response = await fetch(`${BASE_URL}/create_recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to create recipe:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    return false;
  }
};

// SAVED RECIPES

export const fetchSavedRecipesByUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/saved_recipes?author=${userId}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch recipes:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    return null;
  }
};

// COMMENTS

export const fetchCommentsByRecipeId = async (recipeID) => {
  try {
    const response = await fetch(`${BASE_URL}/get_recipe/${recipeID}/comments`);
    console.log("response", response);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch comments:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return [];
  }
};

export const postComment = async (recipeID, userID, content) => {
  try {
    const response = await fetch(
      `${BASE_URL}/get_recipe/${recipeID}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userID,
          content: content,
        }),
      }
    );

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to post comment:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error posting comment:", error.message);
    return false;
  }
};

export const deleteComment = async (recipeID, commentID) => {
  try {
    const response = await fetch(
      `${BASE_URL}/get_recipe/${recipeID}/comments/${commentID}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to delete comment:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    return false;
  }
};

// USER
export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (response.ok) {
      return await response.json();
    } else {
      const error_data = await response.json();
      console.error("Failed to fetch user:", error_data);
      return false;
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
};

// ELASTISEARCH
export const fetchFromES = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/${query}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching:", error.message);
    throw error;
  }
};

// CREATE USER
export const postUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      console.error("Failed to create user:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

export const postToken = async (userData) => {
  try {
    const response = await fetch(`${AUTH_URL}/get_login_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const res = await response.json();
      console.log("token res", res);
      return res;
    } else {
      const errorData = await response.json();
      console.error("Failed to create token:", errorData.error);
      throw new Error(errorData.error);
    }
  } catch (error) {
    console.error("Error creating token:", error.message);
    throw error;
  }
};

export const postLogin = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const res = await response.json();
      console.log("login res", res);
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