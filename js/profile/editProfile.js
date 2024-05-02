import { GET_BASE_URL, PROFILE, API_KEY } from "../variabler.js";
import { load } from "../localStorage/loadInfo.js";

const editContainer = document.querySelector(".userInfo");

//her er en del feil. fortsetter etter required ting er fikset: 
//det står at jeg ikke har mulighet til å sende PUT til bio i postman..

export async function updateProfile() {
    editContainer.innerHTML += "";

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

        editContainer.innerHTML += `<img src="${userData.data.avatar.url}" alt="${userData.data.avatar.alt}" class="profile_img rounded-circle profileImg mb-2"><h3 class="col-12">${userData.data.name}</h3>
        <form class="border rounded p-3 mb-4 text-start col-sm-12 loginForm">
        <lable for="bio">Update your bio here:</label>
        <input type="text" name="bio" id="bioInput" class="form-control form-control-sm mb-1" maxlength="70" value="${userData.data.bio || ''}">
        <button class="btn btn-form mb-3" type="submit">Update bio</button></form>`;

        const updateUserProfile = document.querySelector(".editUserProfile");

        updateUserProfile.addEventListener(`submit`, async (event) => {
            event.preventDefault();
            const formData = new FormData(updateUserProfile);
            const bio = formData.get(`bio`);

            console.log(bio);

            try {
                const updateResponse = await fetch(GET_BASE_URL + PROFILE + `/` + `${profile.name}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Noroff-API-Key": API_KEY,
                        Authorization: `Bearer ${token}`
                    },
                    method: 'PUT',
                    body: JSON.stringify({ bio })
                });

                if (!updateResponse.ok) {
                    throw new Error("Failed to update user info");
                }
                console.log("user info updated succsesfully, send bruker tilbake til profil.html?");
            } catch (error) {
                console.error("Could not update profile: ", error);
            }
        });

        return userData;
    } catch (error) {
        console.error("could not fetch user info: ", error);
    }
}


updateProfile();









