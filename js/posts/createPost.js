
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

//const form = document.querySelector(".postModalContet")
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");
const postImage = document.getElementById("imagesUrl");
const postTags = document.getElementById("postTags");
const addPostBtn = document.getElementById("addPostBtn");

//Create new post
export async function addNewPost(event) {
    event.preventDefault();
    const token = load("token");
    const title = postTitle.value;
    const body = postBody.value;
    const imageUrl = postImage.value;
    const tags = postTags.value;
        try {
            const postData = {
                title,
                body,
                tags: [tags],
                media: {
                    url: imageUrl,
                    alt: "image"
                }
            };

            const response = await fetch(GET_BASE_URL + ALL_POSTS, {
                headers: { 
                    'Content-Type': 'application/json',
                    "X-Noroff-API-Key": API_KEY,
                    Authorization: `Bearer ${token}` 
                },
                method: 'POST',
                body: JSON.stringify(postData),
            });
            console.log(title, body);

            if (!response.ok) {
                throw new Error("Kunne ikke legge til ny post");
            }
            const userData = await response.json();
            console.log(userData);
            window.location.reload();
            // prøv å fjern input-data når posten er postet
            return userData;
        } catch {
            console.log("all kode feilet");
        }
}

addPostBtn.addEventListener(`click`, addNewPost);

//Edit a post that I have written.
/*
export async function editPost(postId2, postData) {
    if(event.target.classList.contains("edit-post")) {
        const thePostEditId = event.target.getAttribute("data-post-edit-id");
        event.preventDefault();

        modal.style.display = "block";

        const token = load("token");
        postTitle.value = postData.title;
        postBody.value = postData.body;
        postImage.value = postData.media.url;

        
        // Hent data for innlegget som skal redigeres
        const postData = {
            title,
            body,
            media: {
                url: imageUrl,
                alt: "image"
            }
        };;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            postData.title = postTitle.value;
            postData.body = postBody.value;
            postData.media.url = postImage.value;

            try {
                await fetch(`${GET_BASE_URL}/social/posts/${postId2}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        "X-Noroff-API-Key": API_KEY,
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(postData),
                });

                // Gi beskjed om at posten er oppdatert
                alert('Your post is updated!');
                window.location.reload();
            } catch(error) {
                console.error("Failed to update post:", error);
            }
    });
}

} */

/*export async function editPost(postId2, postData) {
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

   /* form.addEventListener(`submit`, async function addNewPost(event) {
        event.preventDefault();

        const token = load("token");
        const title = postTitle.value;
        const body = postBody.value;
        const imageUrl = postImage.value;
        
        try {
            const postData = {
                title,
                body,
                media: {
                    url: imageUrl,
                    alt: "image"
                }
            };

            const response = await fetch(GET_BASE_URL + ALL_POSTS, {
                headers: { 
                    'Content-Type': 'application/json',
                    "X-Noroff-API-Key": API_KEY,
                    Authorization: `Bearer ${token}` 
                },
                method: 'POST',
                body: JSON.stringify(postData),
            });
            console.log(title, body);

            if (!response.ok) {
                throw new Error("Kunne ikke legge til ny post");
            }
            const userData = await response.json();
            console.log(userData);
            window.location.reload();
            // prøv å fjern input-data når posten er postet
            return userData;
        } catch {
            console.log("all kode feilet");
        }
    }) */




  