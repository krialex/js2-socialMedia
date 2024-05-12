import { GET_BASE_URL, API_KEY, PROFILE } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";
import { initializeSearch } from "../navigation/searchBtn.js";
import { fetchSingleProfile } from "../profile/profile.js";


// 
initializeSearch();
//

const profileContainer = document.querySelector(".allProfiles");
const searchInput = document.getElementById("search_input");


/*const getData = async (PROFILE, tag = "") => {
    const token = load("token");
    let url = `${GET_BASE_URL}${PROFILE}`;
    
    // Check if tag is defined and not an empty string
    if (tag && typeof tag === 'string' && tag.trim() !== "") {
        url += `?_tag=${tag}`;
    } else if (tag && typeof tag !== 'string') {
        // Handle case if tag is not a string
        throw new Error("Tag must be a string.");
    }
    
    const response = await fetch(url, {
        headers: { 
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${token}` 
        },
        method: 'GET',
    });
    const userData = await response.json();
    console.log("Profiler:", userData);
    return userData;
}

searchInput.addEventListener("input", async () => {
    let entry = searchInput.value.trim().toLowerCase();
    let tag = ""; // Initialize tag as empty

    console.log("Dette skjer:", entry);

    try {
        if (entry === "") {
            const allProfilesData = await getData(PROFILE, tag);
            renderProfiles(allProfilesData.data);
            return;
        }

        const allProfilesData = await getData(PROFILE, tag);
        const filteredProfiles = allProfilesData.data.filter(profile => {
            return profile.name.toLowerCase().includes(entry);
        });

        renderProfiles(filteredProfiles);
        // renderProfiles.addEventListener("click", fetchSingleProfile); //knaskje ikke funker?? 
        // når jeg søker så kan jeg ikke trykke på profilen og displaye den..
        // er det feil med "renderProfiles" i "click"-funksjonen, eller er det et annet sted jeg gjør feil?

    } catch (error) {
        console.log("det har skjedd noe feil:", error);
    }
}); */



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
    console.log("Profiler:", userData);
    return userData;
}

searchInput.addEventListener("input", async () => {
    let entry = searchInput.value.trim().toLowerCase();
    console.log("Dette skjer:", entry);

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
       // renderProfiles.addEventListener("click", fetchSingleProfile); //knaskje ikke funker?? 
        //når jeg søker så kan jeg ikke trykke på profilen og displaye den..
        //er det feil med "renderProfiles" i "click"-funkjson, eller er det et annet sted jeg gjør feil?
                          
    } catch (error) {
        console.log("det har skjedd noe feil:", error);
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



