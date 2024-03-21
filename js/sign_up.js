// global endpoint
// https://v2.api.noroff.dev/

// loacal endpoints
// /auth/register
// 


const registreringForm = document.getElementById("form");
const userName = document.getElementById("loginName");
const userEmail = document.getElementById("loginEmail");
const userPassword = document.getElementById("loginPassword");
const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");


function validateForm(event) {
    event.preventDefault();
    let errorAccured = false;

    if(!checkLength(userName.value, 2) || userName.value.includes("_")) {
        errorName.style.display = "block";
        errorAccured = true;
    } else {
        errorName.style.display = "none";
    } 
    if(!!userEmail.value.includes("@stud.noroff.no")) {
        errorEmail.style.display = "block";
        errorAccured = true;
    } else {
        errorEmail.style.display = "none";
    }
    if(!checkLength(userPassword.value, 8)) {
        errorPassword.style.display = "block";
        errorAccured = true;
    } else {
        errorPassword.style.display = "none";
    }
    if(!errorAccured) {
        registreringForm.onsubmit();
    } 
}

function checkLength(value, len) {
    if(value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

registreringForm.addEventListener("submit", validateForm);


const GET_BASE_URL = `https://v2.api.noroff.dev/`;

async function registrerAccount(url, data) {
    try {
        const postUserInfo = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.log(error);
    }
    const response = await fetch(url, postUserInfo);
    console.log(response);
}

