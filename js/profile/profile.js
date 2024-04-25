import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js"

//const profileImage = document.querySelector(".profileImage");

//getUserProfile();
  
const allProfiles = document.querySelector(".allProfiles");

async function getAllProfiles() {
    const token = load("token");
    try {
        const response = await fetch(GET_BASE_URL + PROFILE, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all users");
        }
        const responseJson = await response.json();
        console.log(responseJson);

        responseJson.data.forEach(profile => {
            console.log(profile);
            allProfiles.innerHTML += `<div class="profile-feed">
            <div class="profile-feed-card">
            <h5>${profile.name}</h5>
            <img src="${profile.avatar.url}"></div>
            </div>`;
        });
    } catch (error) {
        console.log("kan ikke finne alle profiler");
    }
}

getAllProfiles();














/*import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

export async function getProfile(id) {
    const response = await fetch(GET_BASE_URL + PROFILE, {
        headers: { 
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${load("token")}`
        },
        method: 'GET',
    });

    console.log(respone.json());
    return await response.json();
}

getProfile(); */
