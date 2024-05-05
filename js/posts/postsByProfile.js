import { GET_BASE_URL, PROFILE, API_KEY, POST_BY_PROFILE, ALL_POSTS } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js";
import { deletePost } from "../posts/deletePost.js";
import { fillModalForEdit } from "../posts/editPost.js"; 

const userPostsContainer = document.querySelector(".profile-feed");

//Get all the post from a single user (in this, my profile that is loged in).
async function getPostsFromUser() {
    const profile = load("profile");
    const token = load("token");

    getUserProfile();
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
            let postHTML = `<a href="">
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 feed-card userPosts">
                            <h3>${post.title}</h3>
                            <p>${post.body || ''}</p>`;
                
                if(post.media && post.media.url) {
                    postHTML += `<img src="${post.media.url}" alt="${post.media.alt}">`;
                }
                postHTML += `<div class="updates-on-posts">
                <div class="small-btn delete-post" data-post-id="${post.id}">Delete</div>
                <div class="small-btn edit-post" data-post-edit-id="${post.id}">Edit post</div>
                <i class="fa-solid fa-thumbs-up"></i>
                <div>Likes:</div>
                </div></div></div></a>`;
    
                userPostsContainer.innerHTML += postHTML;  
            }); 
    } catch(error) {
        console.log("Dette funka ikke", error);
    }
     //Delete post
     userPostsContainer.addEventListener("click", async(event) => {
        if (event.target.classList.contains("delete-post")) {
            console.log("Inne i attach");
            const thepostid = event.target.getAttribute("data-post-id");
            event.preventDefault();
            deletePost(thepostid);
        }
        //Edit post
        if(event.target.classList.contains("edit-post")) {
            const thePostEditId = event.target.getAttribute("data-post-edit-id");
            event.preventDefault();
            fillModalForEdit(thePostEditId);            
        }
    });
}

getPostsFromUser();

