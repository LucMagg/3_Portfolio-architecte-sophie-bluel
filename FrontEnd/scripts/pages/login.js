import { submitLogin } from "../utils/loghandler.js"

const loginForm = document.querySelector(".login-form");


setLoginListener();


function setLoginListener() {
    loginForm.addEventListener("submit", submitLogin);
}