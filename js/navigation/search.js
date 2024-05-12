import { GET_BASE_URL, API_KEY, SEARCH_POSTS } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { initializeSearch } from "../navigation/searchBtn.js";


// 
initializeSearch();
//

const searchContainer = document.querySelector(".postFeed");
const searchInput = document.getElementById("search_input");
const searchInputTag = document.getElementById("input-tag");

searchInputTag.addEventListener("input", async () => {
    await handleSearch();
});

async function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const searchTag = searchInputTag.value.trim().toLowerCase();

    try {
        let query = '';

        if (searchTerm !== "") {
            query = `/social/posts/search?q=${encodeURIComponent(searchTerm)}`;
        }

        if (searchTag !== "") {
            if (query !== '') {
                query += `&_tag=${encodeURIComponent(searchTag)}`;
            } else {
                query = `/social/posts?_tag=${encodeURIComponent(searchTag)}`;
            }
        }

        if (searchTerm === "" && searchTag === "") {
            query = '/social/posts'; 
        }

        const searchData = await getData(query);
        renderPosts(searchData.data);
    } catch (error) {
        //console.log("An error occurred:", error);
    }
}


searchInput.addEventListener("input", handleSearch);

const getData = async (query) => {
    try {
        const token = load("token");
        const response = await fetch(`${GET_BASE_URL}${query}`, {
            headers: {
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: "GET"
        });
        const userData = await response.json();
        return userData;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};


function renderPosts(posts) {
    let searchHTML = "";

    posts.forEach((post) => {
        searchHTML += `<div class="feed-card userPosts">
                        <h3>${post.title}</h3>
                        <p>${post.body || ""}</p>`;

        if (post.media && post.media.url) {
            searchHTML += `<img src="${post.media.url}" alt="${post.media.alt}"/>`;
        }
        searchHTML += `<div class="updates-on-posts">                               
                                <i class="fa-solid fa-thumbs-up"></i>
                                <div>Likes:</div>
                                </div></div>`;
    });
    searchContainer.innerHTML = searchHTML;
}


