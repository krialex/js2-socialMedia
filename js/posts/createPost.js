
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



    form.addEventListener(`submit`, async function addNewPost(event) {
        event.preventDefault();

        const token = load("token");
        const title = postTitle.value;
        const body = postBody.value;
      
        try {
            const response = await fetch(GET_BASE_URL + ALL_POSTS, {
                headers: { 
                    'Content-Type': 'application/json',
                    "X-Noroff-API-Key": API_KEY,
                    Authorization: `Bearer ${token}` 
                },
                method: 'POST',
                body: JSON.stringify({title, body}),
            });
            console.log(title, body);

            if (!response.ok) {
                throw new Error("Kunne ikke legge til ny post");
            }
            const userData = await response.json();
            console.log(userData);
    
            return userData;
    
        } catch {
            console.log("all kode feilet");
        }
    })
    

