import { checkLogin } from "../utils/api.js";
const errorField = document.getElementById("login-message");
const loginForm = document.querySelector(".login-form");

const submitLogin = async function (event) {
    event.preventDefault();
    
    let return_msg = "";
    /* Check des potentielles erreurs du formulaire de login */
    let emailValue = event.target.querySelector("[name=email]").value;
    let emailRegex = new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailValue === "") {
        return_msg = "Veuillez entrer une adresse e-mail";
    } else if (emailRegex.test(emailValue) === false) {
        return_msg = "Veuillez entrer une adresse e-mail valide";
    }
    let passwordValue = event.target.querySelector("[name=password]").value
    if (passwordValue === "" && return_msg === "") {
        return_msg = "Veuillez entrer un mot de passe";
    }
    /* Ici on peut rajouter des conditions pour le mot de passe (taille minimum, caractères obligatoires...) */

    if (return_msg === "") { /* Si pas d'erreur de formulaire, on check le couple email/password */
        let reponseServer = await checkLogin(emailValue, passwordValue);
        if (reponseServer[0] === false){
            return_msg = reponseServer[1];
        } else {
            errorField.innerHTML = "";
            errorField.style.backgroundColor = "#FFFEF8";
            window.localStorage.setItem("token", reponseServer[1]);
            location.replace("index.html");
        }
    }

    if (return_msg !== "") {
        errorField.innerHTML = return_msg;
        errorField.style.backgroundColor = "rgba(255,0,0,0.1)";
    }
}

loginForm.addEventListener("submit", submitLogin);

