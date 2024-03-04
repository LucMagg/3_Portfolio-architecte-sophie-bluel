import { displayFilters, removeFilters } from "./filters.js";
import { setModifListener } from "./modals.js";

const loginLink = document.getElementById("login-link");
const fixedEditionBar = document.getElementById("mode-edition");
const headerContainer = document.querySelector(".header-container");
const modifLink = document.getElementById("modification");

let token = window.localStorage.getItem("token");

function loginFunction(works) {
    /* Gestion du log in */
    loginLink.innerHTML = "logout";
    loginLink.setAttribute("href","#");

    fixedEditionBar.style.display = "flex";
    headerContainer.style.paddingTop = "50px";

    modifLink.style.display = "block";

    /* Suppression des filtres */
    removeFilters();
    setModifListener(works);
}


function logoutFunction(works) {
    /* Gestion du log out */
    window.localStorage.removeItem("token");
    token = null;
    loginLink.innerHTML = "login";
    loginLink.setAttribute("href", "login.html");

    fixedEditionBar.style.display = "none";
    headerContainer.removeAttribute("style");

    modifLink.style.display = "none";

    displayFilters(works);
}


function check_token(works) {
    /* gestion du lien login/logout en fonction de la présence du token */
    if (token !== null) {
        loginFunction(works);
    } else {
        displayFilters(works);
    }

    /* ajout de l'évènement logout */
    loginLink.addEventListener('click', (event) => {
        if (loginLink.innerHTML === "logout") {
            event.preventDefault();
            logoutFunction(works);
        }
    });
}

export { check_token };