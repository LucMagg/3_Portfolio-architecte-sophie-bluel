import { displayFilters, removeFilters } from "./filters.js";
import { setModifListener, unsetModifListener } from "./modal-gallery.js";
import { checkLogin } from "./api.js";

const loginLink = document.getElementById("login-link");
const fixedEditionBar = document.getElementById("mode-edition");
const headerContainer = document.querySelector(".header-container");
const modifLink = document.getElementById("modification");

const errorField = document.getElementById("login-message");

let token = window.localStorage.getItem("token");



function loginFunction() {
    /* Gestion du log in */
    loginLink.innerHTML = "logout";
    loginLink.setAttribute("href","#");

    fixedEditionBar.style.display = "flex";
    headerContainer.style.paddingTop = "50px";

    modifLink.removeAttribute("style");

    removeFilters();
    setModifListener();
}


function logoutFunction() {
    /* Gestion du log out */
    window.localStorage.removeItem("token");
    token = null;
    loginLink.innerHTML = "login";
    loginLink.setAttribute("href", "login.html");

    fixedEditionBar.style.display = "none";
    headerContainer.removeAttribute("style");

    modifLink.style.display = "none";

    unsetModifListener();
    
    location.replace("login.html");
}


function check_token() {
    /* gestion du lien login/logout en fonction de la présence du token */
    if (token !== null) {
        loginFunction();

        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            logoutFunction();
        });
    } else {
        displayFilters();
    }
}


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

    if (return_msg === "") {
        let reponseServer = await checkLogin(emailValue, passwordValue);
        if (reponseServer[0] === false){
            return_msg = reponseServer[1];
        } else {
            errorField.innerHTML = "";
            errorField.style.display = "none";
            window.localStorage.setItem("token", reponseServer[1]);
            location.replace("index.html");
        }
    }

    if (return_msg !== "") {
        errorField.innerHTML = return_msg;
        errorField.removeAttribute("style");
    }
}



export { check_token, submitLogin };