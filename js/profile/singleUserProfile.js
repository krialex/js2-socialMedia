/*import { getUserProfile } from "../profile/getId.js";
console.log("for profiknapp");
const profileBtns = document.querySelectorAll(".profilKnapp");

profileBtns.forEach(profileBtn => {
        console.log("forech btn");
    profileBtn.addEventListener("click", async function(event) {
        if (event.target.classList.contains("user-profile-info")) {
            const userProfileInfo = event.target.getAttribute("data-profile-name");
            getUserProfile(userProfileInfo);
        }
    });
});
*/








/*/import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
//import { getAllProfiles } from "../profile/profile.js";
//import { load } from "../localStorage/loadInfo.js";
import { getUserProfile } from "../profile/getId.js";


//hente enkeltes profiler
const profileBtns = document.querySelectorAll(".profilKnapp");
console.log("dette er over click");
profileBtns.forEach(profileBtn => {
    profileBtn.addEventListener("click", async function(event) {
        console.group("dette er rett etter click");
       //let profileName = this.dataset.profileName;
        //console.log(profileName);
        //await getUserProfile(`${profile.name}`);
        //window.location.href = "usersProfile.html";
       
       // const profileContainer = document.querySelector(".userInfo");

        if (event.target.classList.contains("user-profile-info")) {
            console.log("Inne i attach");
            const userProfileInfo = event.target.getAttribute("data-profile-name");
            //event.preventDefault();
            getUserProfile(userProfileInfo);
            console.log("dette er inni if");
        }

        try {
            console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
            const token = load("token");



            /*let profileName = this.dataset.profileName;
            console.log(profileName);

            const response = await fetch(GET_BASE_URL + PROFILE + `/${userProfileInfo}`, {
                headers: {
                    //er det riktig med content-type??
                    'Content-Type': 'application/json',
                    "X-Noroff-API-Key": API_KEY,
                    Authorization: `Bearer ${token}`
                },
                method: 'GET',
            });
            console.log("ssssss11111111111111111111111111111111111111sssssss");
            if (!response.ok) {
                throw new Error("Failed to fetch user info");
            }
            console.log("ssssssssss22222222222222222222222222222222ssssssssssssssssss");
            const userData = await response.json();
            console.log(userData);
            

            profileContainer.innerHTML += `<div class="user-profile-info">
                                            <img src="${userData.data.avatar.url}"
                                            alt="${userData.data.avatar.alt}"
                                            class="profile_img rounded-circle profileImg mb-2">
                                            <h3 class="col-12">${userData.data.name}</h3>
                                            <p class="col-12">${userData.data.bio || ''}</p>
                                            </div>`;
            console.log(userData.data.name);
            console.log("ssssssss3333333333333333333333333332222222222ssssssssssssssssss");
            return userData;
        } catch (error) {
            console.log("Could not find profile:", error);
        }
 
    });
});
*/



/*profileContainer.addEventListener("click", async(event) => {
    if (event.target.classList.contains("user-profile-info")) {
        console.log("Inne i attach");
        const userProfileInfo = event.target.getAttribute("data-profile-name");
        event.preventDefault();
        getUserProfile(userProfileInfo);
    }}) */