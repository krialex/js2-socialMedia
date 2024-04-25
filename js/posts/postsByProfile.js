import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js";


const userPostsContainer = document.querySelector(".profile-feed");

async function getPostsFromUser() {
    const profile = load("profile");
    const token = load("token");
    try {
        const response = await fetch(GET_BASE_URL + PROFILE + `/` + `${profile.name}` + `/` + `posts`, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });
        const result = await response.json();

        console.log(result);

        result.data.forEach(post => {
            let postHTML = `<a href=""><div class="col-12 col-sm-6 col-md-4 col-lg-3 feed-card userPosts">
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
    
                userPostsContainer.innerHTML += postHTML;
            }); 

    } catch(error) {
        console.log("Dette funka ikke", error);
    }
}
getPostsFromUser();