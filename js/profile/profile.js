import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
//import { fetchSinglePost } from "../posts/allPosts.js";

const allProfiles = document.querySelector(".profile-feed");
const profileContainer = document.querySelector(".userInfo");
let profileHTML = ''; 
let selectedProfileName = ''; 

export async function getAllProfiles() {
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

        allProfiles.innerHTML = ""; 

        responseJson.data.forEach(profile => {
            profileHTML += `<div class="profilKnapp user-profile-info" 
                            data-profile-name="${profile.name}">
                            
                            <div class="profile-feed-card">
                            <h5>${profile.name}</h5>
                            <img src="${profile.avatar.url}">
                            </div>
                            
                            </div>`;
        });
        allProfiles.innerHTML = profileHTML; 
        allProfiles.addEventListener("click", fetchSingleProfile); //kasnkje denne ikke funker??
    } catch (error) {
        console.log("kan ikke finne alle profiler");
    }
}
getAllProfiles();

// click on single profile and display:
export async function fetchSingleProfile(event) {
    const token = load("token");
    const clickedProfile = event.target.closest('.profilKnapp');
    if (clickedProfile) {
        selectedProfileName = clickedProfile.dataset.profileName; 
        const profileName = clickedProfile.dataset.profileName;
        console.log("Inne i attach");
        const response = await fetch(`${GET_BASE_URL}${PROFILE}/${profileName}`, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });
        console.log(profileName);
        console.log("dette er responsen på fetch:", response);

        if (response.ok) {
            const singleProfile = await response.json();
            console.log(singleProfile);
            const profileHTML = `<img src="${singleProfile.data.avatar.url}" 
                                alt="${singleProfile.data.avatar.alt}" 
                                class="profile_img rounded-circle profileImg mb-2">
                                <h3 class="col-12">${singleProfile.data.name}</h3>
                                <p class="col-12">${singleProfile.data.bio || ''}</p>`;
                                
            profileContainer.innerHTML = profileHTML; 
            allProfiles.innerHTML = ""; 

            postFromProfile();
        } else {
            console.log("Failed to fetch single profile");
        }
    }
}

async function postFromProfile() {
    const token = load("token");

    try {
        const response = await fetch(`${GET_BASE_URL}${PROFILE}/${selectedProfileName}/posts`, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });
        const result = await response.json();

        console.log(result);

        result.data.forEach(post => {
            let postHTML = `
                            <div class="feed-card userPosts">
                            <h3>${post.title}</h3>
                            <p>${post.body || ''}</p>`;
                
                if(post.media && post.media.url) {
                    postHTML += `<img src="${post.media.url}" alt="${post.media.alt}">`;
                }
                postHTML += `<div class="updates-on-posts">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <div>Likes:</div>
                            </div></div></div>`;
    
                allProfiles.innerHTML += postHTML; 
                //allProfiles.addEventListener("click", fetchSinglePost);
                 
            }); 
    } catch(error) {
        console.log("Dette funka ikke", error);
    }
}
