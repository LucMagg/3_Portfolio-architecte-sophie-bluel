import { checkLogin } from "../utils/api.js";

const loginForm = document.getElementById("login-form");
const errorField = document.getElementById("login-container__errorfield");



const submitLogin = async function (event) {
    event.preventDefault();
       
    let returnMessage = "";
    /* Check des potentielles erreurs du formulaire de login */
    let emailValue = event.target.querySelector("[name=email]").value;
    let emailRegex = new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailValue === "") {
        returnMessage = "Veuillez entrer une adresse e-mail";
    } else if (emailRegex.test(emailValue) === false) {
        returnMessage = "Veuillez entrer une adresse e-mail valide";
    }
    let passwordValue = event.target.querySelector("[name=password]").value;
    if (passwordValue === "" && returnMessage === "") {
        returnMessage = "Veuillez entrer un mot de passe";
    }

    if (returnMessage === "") {
        let serverResponse = await checkLogin(emailValue, passwordValue);
        if (serverResponse[0] === false){
            returnMessage = serverResponse[1];
        } else {
            errorField.innerHTML = "";
            errorField.classList.remove("error-visible");
            window.localStorage.setItem("token", serverResponse[1]);
            location.replace("index.html");
        }
    }

    if (returnMessage !== "") {
        errorField.innerHTML = returnMessage;
        errorField.classList.add("error-visible");
    }
}


function setLoginListener() {
    loginForm.addEventListener("submit", submitLogin);
}



setLoginListener();