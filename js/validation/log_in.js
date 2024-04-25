import { GET_BASE_URL, LOGIN, API_KEY } from "../variabler.js";
import { save } from "../localStorage/saveInfo.js";
//import { getProfile } from "../profile/profile.js";
//import { getId } from "../profile/getId.js";


const logInForm = document.querySelector(".logIn");
const userEmail = document.getElementById("loginEmail");
const userPassword = document.getElementById("loginPassword");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

/**
 * lOGIN FORM VALIDATION    
 * @param {email from input} email 
 * @param {password from input} password 
 * @returns 
 */
export async function login(email, password) {
    const response = await fetch(GET_BASE_URL + LOGIN, {
        headers: { 
            "X-Noroff-API-Key": API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }), 
    });

    if (response.ok) {
        const { accessToken, ...profile } = (await response.json()).data;
        save("token", accessToken);
        save("profile", profile);
        return profile;
    }
    console.log(userEmail, userPassword);
    
    throw new Error("Could not log in");
}

export function validateEmail(email) {
    const pattern = /@stud\.noroff\.no$/;
    return pattern.test(email);
}

logInForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    let isValid = true;

    if (userEmail.value.trim() === "" || !validateEmail(userEmail.value)) {
        errorEmail.style.display = "block";
        isValid = false;
    } else {
        errorEmail.style.display = "none";
    }
    if (userPassword.value.trim().length < 8) {
        errorPassword.style.display = "block";
        isValid = false;
    } else {
        errorPassword.style.display = "none";
    }

    if (isValid) {
        const email = userEmail.value;
        const password = userPassword.value;
        console.log(email, password);

        try {
            await login(email, password); 
            setTimeout(() => window.location.replace("profile.html"), 2000);
        } catch (error) {
            console.error(error);
        }
        //getId(email);
    }
});
