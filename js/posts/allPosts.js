import { GET_BASE_URL, API_KEY, ALL_POSTS } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js";
import { fetchSinglePost } from "../posts/singlePost.js";

const profileImage = document.querySelector(".profileImage");
  
const allPosts = document.querySelector(".postFeed");

// Get all the post for the post feed-page:
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

        allPosts.innerHTML = "";

        responseJson.data.forEach(post => {
            let postHTML = `<a href="#" class="feed-card" data-post-id="${post.id}">
                            <div class="userPosts">
                            <h3>${post.title}</h3>
                            <p>${post.body || ''}</p>`;

                if(post.media && post.media.url) {
                postHTML += `<img src="${post.media.url}" alt="${post.media.alt}">`;
                }
                postHTML += `<div class="updates-on-posts">                          
                            <i class="fa-solid fa-thumbs-up"></i>
                            <div>Likes:</div>                           
                            </div></div></a>`;

                allPosts.innerHTML += postHTML;
                allPosts.addEventListener("click", fetchSinglePost);
        }); 
    } catch (error) {
        console.log("kan ikke finne alle postene");
    }
}

getAllPosts();






