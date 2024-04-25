import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

const profileContainer = document.querySelector(".userInfo");

export async function getUserProfile() {
    profileContainer.innerHTML += "";

    const profile = load("profile");
    const token = load("token");

    try {
        const response = await fetch(GET_BASE_URL + PROFILE + `/` + `${profile.name}`, {
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
        console.log(userData);

        profileContainer.innerHTML += `<img src="${userData.data.avatar.url}" alt="${userData.data.avatar.alt}" class="profile_img rounded-circle profileImg mb-2"><h3 class="col-12">${userData.data.name}</h3>
        <p class="col-12">${userData.data.bio || ''}</p>`;

        return userData;
    } catch {
        console.log("could not find profile");
    }
}
getUserProfile();
  









