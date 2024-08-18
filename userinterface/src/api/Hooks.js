import { useState, useEffect, useContext } from "react";

import { addFriend, removeFriend, getFriends, getUser, getRecommendedFriends } from "./api";

const userID = "email@uq.edu.au";

export const useGetFriendsByUsername = (currentUserUsername) => {
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await getFriends(userID);
      if (data) {
        setFriendsData(data);
      }
      setLoading(false);
    };

    fetchFriends();
  }, []);

  return { friendsData, loading };
};

export const useGetRecommendedFriends = () => {
    const [recommendedFriendsData, setRecommendedFriendsData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchRecommendedFriends = async () => {
        const data = await getRecommendedFriends;
        if (data) {
            setRecommendedFriendsData(data);
        }
        setLoading(false);
      };
  
      fetchRecommendedFriends();
    }, []);
  
    return { recommendedFriendsData, loading };
  };

export const useGetUserByUsername = (username) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(username);
      if (data) {
        setUserData(data);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { userData, loading };
};

/*
export const useFriendToggle = (currentUserUsername, friendUsername) => {
    const [friendStatus, setFriendStatus] = useState(false);
    const [friendsList, setFriends] = useState([]);

    useEffect(() => {
        const getFriends = async (currentUserUsername) => {
            const friendsData = await getFriends(currentUserUsername);
            setFriends(friendsData);
        };
    
        getFriends(currentUserUsername);
      }, [currentUserUsername]);

    useEffect(() => {
        const handleGetFriends = async (currentUserUsername) => {
            const friendsData = await getFriends(currentUserUsername);
            setFriends(friendsData);
        };
      });
      
    handleGetFriends();

    const handleAddFriend = async (event) => {
        event.preventDefault();
    
        console.log("you:", currentUserUsername);
        console.log("friend:", friendUsername);

        const success = await addFriend(currentUserUsername, friendUsername);

        console.log("success", success);
        
        if (success) {
            setNewComment("");
            const commentsData = await fetchCommentsByRecipeId(recipeID);
            console.log("commentData", commentsData);
            const commentsWithUserDetails = await Promise.all(
                commentsData.map(async (comment) => {
                const user = await fetchUserById(comment.user_id);
                return { ...comment, username: user?.username || "Unknown" };
                })
            );
            setComments(commentsWithUserDetails);
        }
    };
  
    const handleFieldChange = (fieldName, value) => {
        setFormData({ ...userData, [fieldName]: value });
    };
  
    const handleAddUser = async (event) => {
    event.preventDefault();
        try {
            const success = await postUser(userData);
            if (success) {
                console.log("sucessess", success);
                console.log("sucessess message", success.message);
                console.log("sucessess id", success.user_id);
                setUserID("sucess user_id", success.user_id);
                onSuccess();
            }
        } catch (error) {
            setError(error.message);
        }
    };
    
    return { userData, userID, loading, handleAddUser, handleFieldChange };
};



export const useCreateUser = (initialUserData, onSuccess, setError) => {
    const [userData, setFormData] = useState(initialUserData);
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState();
  
    const handleFieldChange = (fieldName, value) => {
        setFormData({ ...userData, [fieldName]: value });
    };
  
    const handleAddUser = async (event) => {
    event.preventDefault();
        try {
            const success = await postUser(userData);
            if (success) {
                console.log("sucessess", success);
                console.log("sucessess message", success.message);
                console.log("sucessess id", success.user_id);
                setUserID("sucess user_id", success.user_id);
                onSuccess();
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return { userData, userID, loading, handleAddUser, handleFieldChange };
};
*/
