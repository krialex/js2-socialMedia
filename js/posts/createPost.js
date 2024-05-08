const newPostBtn = document.querySelectorAll(".newPostModal");
const modal = document.getElementById("postModal");
const span = document.querySelector(".close");

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

import { GET_BASE_URL, ALL_POSTS, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

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

            if (!response.ok) {
                throw new Error("Kunne ikke legge til ny post");
            }
            const userData = await response.json();
            window.location.reload();
            // prøv å fjern input-data når posten er postet
            return userData;
        } catch {
            console.log("all kode feilet");
        }
}

addPostBtn.addEventListener(`click`, addNewPost);

