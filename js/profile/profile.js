import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

const profileImage = document.querySelector(".profileImage");

export async function getProfiles() {
    profileImage.innerHTML += "";

    const profile = load("profile");
    const token = load("token");

    try {
        const response = await fetch(GET_BASE_URL + PROFILE + `/` + `${profile.name}`, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user info");
        }
    
        const userData = await response.json();

        console.log(userData);

        profileImage.innerHTML += `<img src="${userData.data.avatar.url}" alt="${userData.data.avatar.alt}" class="profile_img rounded-circle profileImg mb-2">`;

        getAllProfiles();
    
        return userData;

    } catch {
        console.log("could not find profile");
    }

}

getProfiles();
  
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
            allProfiles.innerHTML += `<div class="row">
            <div class="userPosts col-4">${profile.name} 
            <img src="${profile.avatar.url}"></div>
            </div>`;
        });
        //console.log(data);

    } catch (error) {
        console.log("kan ikke finne alle profiler");
    }
}
















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
