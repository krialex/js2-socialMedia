const newPostBtn = document.querySelectorAll(".newPostModal");
const modal = document.getElementById("postModal");
const span = document.querySelector(".close");
const updateBtn = document.getElementById("update-post-btn");
const addPostBtn = document.getElementById("addPostBtn");

newPostBtn.forEach(button => {
    button.addEventListener('click', function() {
        modal.style.display = "block";
    });
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = "none";
    }
} 

import { GET_BASE_URL, ALL_POSTS, API_KEY } from "../variables.js";
import { load } from "../localStorage/loadInfo.js";

const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");
const postImage = document.getElementById("imagesUrl");


let currentPostId = null;

updateBtn.addEventListener('click', async (event) => { 
    const postId = currentPostId;
    await handleEditPost(event, postId);
});

export async function fillModalForEdit(postId) {
    let postData = {};
    try {
        const token = load("token");

        const response = await fetch(`${GET_BASE_URL}/social/posts/${postId}`, {
            method: 'GET',
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch post data");
        }

        postData = await response.json();
        
        modal.style.display = "block";
        updateBtn.style.display = "block";
        addPostBtn.style.display = "none";
        
        currentPostId = postId;
       
        postTitle.value = postData.data.title;
        postBody.value = postData.data.body;
        postImage.value = postData.data.media.url; 
    } catch(error) {
        console.error("Failed to fetch post data:", error);
    }
}


// Function to handle editing a post
export async function handleEditPost(event, postId) {
    event.preventDefault();
    try {
        const token = load("token");

        const postData = {
            title: postTitle.value,
            body: postBody.value,
            media: {
                url: postImage.value,
                alt: "image"
            }
        };

        const response = await fetch(`${GET_BASE_URL}/social/posts/${postId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error("Failed to update post");
        }
        alert('Your post is updated!');
        window.location.reload();

    } catch(error) {
        console.error("Failed to update post:", error);
    }
}