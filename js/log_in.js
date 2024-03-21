const logInForm = document.getElementById("form");
const userEmail = document.getElementById("loginEmail");
const userPassword = document.getElementById("loginPassword");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");


function validateForm(event) {
    event.preventDefault();
    let errorAccured = false;

    if(!userEmail.value.includes("@stud.noroff.no")) {
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
        logInForm.onsubmit();
    } 
}

function checkLength(value, len) {
    if(value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

logInForm.addEventListener("submit", validateForm);