import { GET_BASE_URL, API_KEY, SEARCH_POSTS } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { initializeSearch } from "../navigation/searchBtn.js";


// 
initializeSearch();
//

const searchContainer = document.querySelector(".postFeed");


const getData = async(query) => {
    const token = load("token");
    const response = await fetch(`${GET_BASE_URL}${query}`, {
        headers: { 
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${token}` 
        },
        method: 'GET',
    });
    const userData = await response.json();
    console.log(userData);
    return userData;
}

searchInput.addEventListener("input", async () => {
    let entry = searchInput.value.trim().toLowerCase();
    console.log("Dette skjer:", entry);

    try {
        if (entry === "") {
            const allPostsData = await getData(SEARCH_POSTS);
            renderPosts(allPostsData.data);
            return;
        }

        const searchLoad = await getData(`/social/posts/search?q=${encodeURIComponent(entry)}`);
        console.log(searchLoad);

        renderPosts(searchLoad.data);
    } catch (error) {
        console.log("det har skjedd noe feil:", error);
    }
});

function renderPosts(posts) {
    let searchHTML = "";
    
    posts.forEach(post => {
        searchHTML += `<div class="feed-card userPosts">
                        <h3>${post.title}</h3>
                        <p>${post.body || ''}</p>`;
                
        if(post.media && post.media.url) {
            searchHTML += `<img src="${post.media.url}" alt="${post.media.alt}"/>`; 
        }
        searchHTML += `</div>`;
    }); 
    searchContainer.innerHTML = searchHTML;
}


