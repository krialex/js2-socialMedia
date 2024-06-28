import { GET_BASE_URL, API_KEY, PROFILE } from "../variables.js";
import { load } from "../localStorage/loadInfo.js";
import { initializeSearch } from "../navigation/searchBtn.js";
import { fetchSingleProfile } from "../profile/profile.js";

// 
initializeSearch();
//

const profileContainer = document.querySelector(".allProfiles");
const searchInput = document.getElementById("search_input");

const getData = async(PROFILE) => {
    const token = load("token");
    const response = await fetch(`${GET_BASE_URL}${PROFILE}`, {
        headers: { 
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${token}` 
        },
        method: 'GET',
    });
    const userData = await response.json();
    return userData;
}

searchInput.addEventListener("input", async () => {
    let entry = searchInput.value.trim().toLowerCase();
    try {
        if (entry === "") {
            const allProfilesData = await getData(PROFILE);
            renderProfiles(allProfilesData.data);
            return;
        }

        const allProfilesData = await getData(PROFILE);
        const filteredProfiles = allProfilesData.data.filter(profile => {
        return profile.name.toLowerCase().includes(entry);
        });

        renderProfiles(filteredProfiles);
    } catch (error) {
        console.log("there is an error:", error);
    }
});


function renderProfiles(profiles) {
    let searchHTML = "";
    profiles.forEach(profile => {
        searchHTML += `<div class="profile-feed">
        <div class="profile-feed-card">
        <h5>${profile.name}</h5>
        <img src="${profile.avatar.url}"></div>
        </div>`;
    });
    profileContainer.innerHTML = searchHTML;
}



