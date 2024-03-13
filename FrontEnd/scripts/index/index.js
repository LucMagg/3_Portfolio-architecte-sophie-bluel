import { setModalAddPhotoListeners } from "./modalAddPhoto.js"
import { setModalGalleryListeners, openModalGallery } from "./modalGallery.js";
import { displayGallery } from "../utils/gallery.js";
import { displayFilters, removeFilters } from "./filters.js";

const loginLink = document.getElementById("login-link");
const fixedEditionBar = document.getElementById("header__mode-edition");
const headerContainer = document.getElementById("header__container");
const modifLink = document.getElementById("portfolio__title__modification");



function loginFunction() {
    /* Gestion du log in */
    loginLink.innerHTML = "logout";
    loginLink.setAttribute("href","#");

    fixedEditionBar.style.display = "flex";
    headerContainer.style.paddingTop = "50px";

    modifLink.removeAttribute("style");

    removeFilters();
}


function logoutFunction() {
    /* Gestion du log out */
    window.localStorage.removeItem("token");
    loginLink.innerHTML = "login";
    loginLink.setAttribute("href", "login.html");

    fixedEditionBar.style.display = "none";
    headerContainer.removeAttribute("style");

    modifLink.style.display = "none";
    
    location.replace("login.html");
}


function checkToken() {
    /* gestion du lien login/logout en fonction de la présence du token */
    let token = window.localStorage.getItem("token");

    if (token !== null) {
        loginFunction();

        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            logoutFunction();
        });
        return true;
    } else {
        return false;
    }
}


function setIndexListeners(works) {
    window.addEventListener('beforeunload', () => {
        window.localStorage.removeItem("token");
    });

    modifLink.addEventListener('click', (event) => {
        event.preventDefault();
        openModalGallery(works);
    });
}




let works = await displayGallery();
if (!checkToken()) {
    displayFilters(works);
};

setIndexListeners(works);
setModalGalleryListeners(works);
setModalAddPhotoListeners(works);