import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

// sjekk om jeg følger alt:
export async function amIFollowing(navntilden) {
    const profileName = (await load("profile")); // Convert to lowercase
    const token = load("token");
    console.log("Dette er mitt navn", profileName, "Her er navn til den: ", navntilden);
    try {
        const response = await fetch(GET_BASE_URL + PROFILE + `/` + `${navntilden}` + `?_followers=true`, {
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


// Funksjon for å følge en bruker
export async function followUser(event, profileName) {
    event.preventDefault();
    try {
        const token = load("token");

        /*const followData = {
            followers: []
        };*/

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

// Funksjon for å ikke-følge en bruker
export async function unfollowUser(event, profileName) {
    event.preventDefault();
    try {
        const token = load("token");

       /* const unfollowData = { //fjern denne på begge funksjoner..
            followers: []
        }; */

        const response = await fetch(`${GET_BASE_URL}${PROFILE}/${profileName}/unfollow`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
        });
        console.log(unfollowData);

        if (!response.ok) {
            throw new Error("Failed to unfollow user");
        }

    } catch(error) {
        console.error("Failed to unfollow:", error);
    }
}
