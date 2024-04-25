import { GET_BASE_URL, PROFILE, API_KEY, ALL_POSTS } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js";

const profileImage = document.querySelector(".profileImage");

/*export async function getProfiles() {
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

        getAllPosts();
    
        return userData;

    } catch {
        console.log("could not find profile");
    }
}
getProfiles(); */
  
const allPosts = document.querySelector(".postFeed");

export async function getAllPosts() {
    
    const token = load("token");
    try {
        const response = await fetch(GET_BASE_URL + ALL_POSTS, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Failed to fetch all posts");
        }
        const responseJson = await response.json();
        console.log(responseJson);

        responseJson.data.forEach(post => {
        let postHTML = `<a href="usersProfile.html">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3 feed-card userPosts">
                        <h3>${post.title}</h3>
                        <p>${post.body || ''}</p>
                        <div class="updates-on-posts">
                        <div class="small-btn delete-post">Delete</div>
                        <div class="small-btn">Edit post</div>
                        <i class="fa-solid fa-thumbs-up"></i>
                        <div>Likes:</div>
                        </div>`;
            
            if(post.media && post.media.url) {
                postHTML += `<img src="${post.media.url}" alt="${post.media.alt}"`;
            }
            postHTML += `</div></a>`;

            allPosts.innerHTML += postHTML;
        }); 
    } catch (error) {
        console.log("kan ikke finne alle postene");
    }
}

getAllPosts();















