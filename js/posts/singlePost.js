import { GET_BASE_URL, API_KEY, ALL_POSTS } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

//Display single post
export async function fetchSinglePost(event) {
    const token = load("token");
    const clickedPost = event.target.closest('.feed-card');
    if (clickedPost) {
        const postId = clickedPost.dataset.postId;
        console.log("Inne i attach");
        const response = await fetch(`${GET_BASE_URL}${ALL_POSTS}/${postId}`, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });
        console.log(postId);
        console.log("dette er responsen på fetch:", response);

        if (response.ok) {
            const singlePost = await response.json();
            console.log(singlePost);

            const allPostElements = document.querySelectorAll('.feed-card');
            
            allPostElements.forEach(postElement => {
                if (postElement !== clickedPost) {
                    postElement.style.display = 'none';
                }
            });
            let postHTML = `<div class="userPosts">
                            <h3>${singlePost.data.title}</h3>
                            <p>${singlePost.data.body || ''}</p>`;
                
            if(singlePost.data.media && singlePost.data.media.url) {
                postHTML += `<img src="${singlePost.data.media.url}" alt="${singlePost.data.media.alt}">`;
            }
                postHTML += `<div class="updates-on-posts">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <div>Likes:</div>
                            </div></div>`;

            clickedPost.innerHTML = postHTML;
        } else {
            console.log("Failed to fetch single post");
        }        
    }
}
