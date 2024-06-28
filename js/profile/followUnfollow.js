import { GET_BASE_URL, PROFILE, API_KEY } from "../variables.js";
import { load } from "../localStorage/loadInfo.js";

// Chech if user is already following an other user
export async function amIFollowing(otherUser) {
    const profileName = (await load("profile")); 
    const token = load("token");

    try {
        const response = await fetch(GET_BASE_URL + PROFILE + `/` + `${otherUser}` + `?_followers=true`, {
            headers: {
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Failed to fetch followers data");
        }

        const responseData = await response.json();
        console.log("Response data:", responseData);

        if (responseData.data.followers && responseData.data.followers.length > 0) {
            const followerNames = responseData.data.followers.map(follower => follower.name); 
            const isFollowing = followerNames.includes(profileName.name);

            return isFollowing;
        } else {
            console.log("No followers data found.");
            return false;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false;
    }
}

// Follow a user
export async function followUser(event, profileName) {
    event.preventDefault();
    try {
        const token = load("token");

        const response = await fetch(`${GET_BASE_URL}${PROFILE}/${profileName}/follow`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to follow user");
        } 
    } catch(error) {
       console.error("Failed to follow:", error);
    }
}

// Unfollow a user
export async function unfollowUser(event, profileName) {
    event.preventDefault();
    try {
        const token = load("token");

        const response = await fetch(`${GET_BASE_URL}${PROFILE}/${profileName}/unfollow`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to unfollow user");
        }

    } catch(error) {
        console.error("Failed to unfollow:", error);
    }
}
