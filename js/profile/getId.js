import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

const profileContainer = document.querySelector(".userInfo");

export async function getUserProfile(name) {
    profileContainer.innerHTML += "";

    const profile = await load("profile");
    const token = load("token");
    let tempName = profile.name;
    let profileName;
    
           if (name === undefined || name === null || name === "") {
            profileName = tempName;
                } else {
                profileName = name;
                }
                
            console.log(profileName); 
    try {
        const response = await fetch(GET_BASE_URL + PROFILE + `/` + `${profileName}`, {
            headers: { 
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user info");
        }
        const userData = await response.json();

        profileContainer.innerHTML += `<img src="${userData.data.avatar.url}" 
                                        alt="${userData.data.avatar.alt}" 
                                        class="profile_img rounded-circle profileImg mb-2">
                                        <h3 class="col-12">${userData.data.name}</h3>
                                        <p class="col-12">${userData.data.bio || ''}</p>
                                        <div class="followers-info">
                                        <a href="editProfile.html" class="follow-btn" style="text-decoration: none">Edit profile</a>
                                        <div class="follow-btn"><div>Followers: </div>
                                        <div>${userData.data._count.followers}</div></div>
                                        <div class="follow-btn"><div>Following: </div>
                                        <div>${userData.data._count.following}</div></div>
                                        </div>`;

        return userData;
    } catch {
        console.log("could not find profile");
    }
}

  










