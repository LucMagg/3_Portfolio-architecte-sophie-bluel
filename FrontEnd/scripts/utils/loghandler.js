import { displayFilters, removeFilters } from "./filters.js";
import { setModifListener, unsetModifListener } from "./modal-gallery.js";

const loginLink = document.getElementById("login-link");
const fixedEditionBar = document.getElementById("mode-edition");
const headerContainer = document.querySelector(".header-container");
const modifLink = document.getElementById("modification");

let token = window.localStorage.getItem("token");

function loginFunction() {
    /* Gestion du log in */
    loginLink.innerHTML = "logout";
    loginLink.setAttribute("href","#");

    fixedEditionBar.style.display = "flex";
    headerContainer.style.paddingTop = "50px";

    modifLink.style.display = "block";

    /* Suppression des filtres */
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
    } else {
        displayFilters();
    }

    /* ajout de l'évènement logout */
    loginLink.addEventListener('click', (event) => {
        if (loginLink.innerHTML === "logout") {
            event.preventDefault();
            logoutFunction();
        }
    });
}

export { check_token };