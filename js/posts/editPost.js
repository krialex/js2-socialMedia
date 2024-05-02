const newPostBtn = document.getElementById("newPostModal");
const modal = document.getElementById("postModal");
const span = document.querySelector(".close");

newPostBtn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = "none";
    }
} 

import { GET_BASE_URL, ALL_POSTS, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

const form = document.querySelector(".postModalContet")
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");
const postImage = document.getElementById("imagesUrl");


// Legg til hendelseshåndtereren for skjemaet når dokumentet lastes inn
form.addEventListener('submit', async (event) => { 
    const postId = event.target.getAttribute("data-post-edit-id");
    await handleEditPost(event, postId);
});

// I fillModalForEdit-funksjonen
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
            //body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch post data");
        }

        postData = await response.json();
        console.log("dette er responsen,- postData:", postData); //denne kommer opp

        postData = { // trenger odd-hjelp til denne!!
            title: postTitle.value,
            body: postBody.value,
            media: {
                url: postImage.value,
                alt: "image"
            }
        }
        
        modal.style.display = "block";
        

        // Det er noe galt med postData.. den blir undefined. hjelp fra odd
       /* postTitle.value = postData.title;
        console.log("dette er tittelen", postData.title);
        postBody.value = postData.body;
        postImage.value = postData.media.url; */

    } catch(error) {
        console.error("Failed to fetch post data:", error);
    }
}


// Function to handle form submission for editing a post
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





// Function to fill the modal with post data for editing
/*export async function fillModalForEdit(postId) {
    try {
        const token = load("token");

        // Fetch post data based on postId
        const response = await fetch(`${GET_BASE_URL}/social/posts/${postId}`, {
            method: 'GET',
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch post data");
        }

        // Extract post data from response
        const postData = await response.json();
        console.log("dette er responsen,- postData:", postData);

        // Fill modal inputs with post data
        postTitle.value = postData.title;
        console.log("dette er tittelen", postData.title);
        postBody.value = postData.body;
        postImage.value = postData.media.url;

        // Display the modal
        modal.style.display = "block";

        form.addEventListener('submit', async (event) => { 
            const postId = event.target.getAttribute("data-post-edit-id");
            await handleEditPost(event, postId);
        });

    } catch(error) {
        console.error("Failed to fetch post data:", error);
    }
} */




/*import {  API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js";


//Edit a post that I have written.
export async function editPost(postId2, postData) {
    const token = load("token");
    console.log("etter token");
   
    try {
        const response = await fetch('https://v2.api.noroff.dev/social/posts/' + `${postId2}`, {
            method: 'PUT',
            headers: { 
               'Content-Type': 'application/json; charset=utf-8',
                "X-Noroff-API-Key": API_KEY,
                "x-Trigger": "CORS", // kanskje ta vekk disse 2
                "Cache-Control": 'no-cache',
               Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postData),
        });
        console.log("etter FETCH");

        console.log("Post updated successfully");
        if(!alert('Your post is updated!')){window.location.reload();}
        
        const result = await response.json();
        console.log(result);
    } catch(error) {
        console.log("finner ikke posten i api"+ result);
    }

} */

/* 
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");
const postImage = document.getElementById("imagesUrl");

    const thePostEditId = document.getElementById("newPostModal");
    const modal = document.getElementById("postModal");
    const span = document.querySelector(".close");

    thePostEditId.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if(event.target === modal) {
            modal.style.display = "none";
        }
    }
    const title = postTitle.value;
    const body = postBody.value;
    const imageUrl = postImage.value;

    const postData = {
        title,
        body,
        media: {
            url: imageUrl,
            alt: "image"
        }
    }; */