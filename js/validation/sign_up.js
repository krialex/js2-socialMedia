import { GET_BASE_URL, REGISTRER } from "../variables.js";


const registreringForm = document.querySelector(".signUpForm");
const userName = document.getElementById("loginName");
const userEmail = document.getElementById("loginEmail");
const userPassword = document.getElementById("loginPassword");
const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");


// Get api to sign up:
export async function registrerAccount(name, email, password) {
    try {
        const response = await fetch(GET_BASE_URL + REGISTRER, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result); 
        } else {
            throw new Error("Could not registrer account");
        }}
    catch(error) {
        console.log(error);
    }
};


export function validateEmail(email) {
    const pattern = /@stud\.noroff\.no$/;
    return pattern.test(email);
}

registreringForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    let isValid = true;

    if (userName.value.trim() === "") {
        errorName.style.display = "block";
        isValid = false;
    } else {
        errorName.style.display = "none";
    }
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
        const name = userName.value;
        const email = userEmail.value;
        const password = userPassword.value;

        try {
            await registrerAccount(name, email, password); 
            setTimeout(() => window.location.replace("index.html"), 500);
        } catch (error) {
            console.error(error);
        }
    }
});
