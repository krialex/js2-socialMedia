import { GET_BASE_URL, ALL_POSTS } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

const profileFeed = document.querySelector(".profile-feed");

export async function getMyPosts() {
    const token = load("token");
    try {
        const response = await fetch(GET_BASE_URL + ALL_POSTS + `/` + `1301`, {
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

            profileFeed.innerHTML += postHTML;
        }); 
    } catch (error) {
        console.log("kan ikke finne alle postene mine");
    }
}
getMyPosts();