import { setModalAddPhotoListeners } from "./modalAddPhoto.js"
import { setModalGalleryListeners, openModalGallery } from "./modalGallery.js";
import { displayGallery } from "../utils/gallery.js";
import { displayFilters, removeFilters } from "./filters.js";

const loginLink = document.getElementById("login-link");
const fixedEditionBar = document.getElementById("mode-edition");
const headerContainer = document.querySelector(".header-container");
const modifLink = document.getElementById("portfolio-title-modification");



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
    let token = window.localStorage.getItem("token");

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


function setOnCloseListener() {
    /* Nettoyage du localStorage à la fermeture de la page */
    window.addEventListener('beforeunload', () => {
        window.localStorage.removeItem("token");
    });
}


const modifListener = function(event) {
    event.preventDefault();
    openModalGallery();
}


function setModifListener() {
    modifLink.addEventListener('click', modifListener);
}


function unsetModifListener() {
    modifLink.removeEventListener('click', modifListener);
}



check_token();
displayGallery();
setOnCloseListener();
setModalGalleryListeners();
setModalAddPhotoListeners();