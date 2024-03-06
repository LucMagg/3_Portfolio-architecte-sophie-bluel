import { getContents, deleteItem } from "./api.js";
import { displayGallery } from "./filters.js";
import { openModalAddPhoto } from "./modal-ajoutphoto.js";

const modifLink = document.getElementById("modification");

const modalGallery = document.getElementById("modal-gallery");
const modalContainer = document.getElementById("modal-gallery-container");
const modalGalleryDisplay = document.getElementById("modal-gallery-gallerydisplay");
const modalButton = document.getElementById("modal-gallery-button");
const modalCloseButton = document.getElementById("modal-gallery-closeicon");


function setModifListener() {
    modifLink.addEventListener('click', modifListener);
}

function unsetModifListener() {
    modifLink.removeEventListener('click', modifListener);
}

const modifListener = function(event) {
    event.preventDefault();
    openModalGallery();
}

function openModalGallery() { 
    modalGallery.showModal();
    setListeners();
    afficheModalGallery();
}

function closeModalGallery() {
    modalGallery.close();
    unsetListeners();
    displayGallery();
}

function setListeners() {
    modalGallery.addEventListener("click", closeListener);
    modalContainer.addEventListener("click", modalStop);
    modalCloseButton.addEventListener("click", closeListener);
    modalButton.addEventListener("click", openNextModal);
}

function unsetListeners() {
    modalGallery.removeEventListener("click", closeListener);
    modalContainer.removeEventListener("click", modalStop);
    modalCloseButton.removeEventListener("click", closeListener);
    modalButton.removeEventListener("click", openNextModal);
}

const closeListener = function(event) {
    event.preventDefault();
    closeModalGallery();
}

const modalStop = function(event) {
    event.stopPropagation();
}

const openNextModal = function(event) {
    event.preventDefault();
    modalGallery.close();
    openModalAddPhoto();
}

async function afficheModalGallery() {
    modalGalleryDisplay.innerHTML = "";

    let works = await getContents();

    for (let i = 0; i < works.length; i++) {
        /* Construction du html de chaque photo */
        const galleryElement = document.createElement("figure");
        galleryElement.setAttribute("class", "modal-gallerydisplay-item");
        const image = document.createElement("img");
        image.setAttribute("src", works[i].imageUrl);
        image.setAttribute("alt", works[i].title);
        image.setAttribute("id", "gallery-id-" + works[i].id);
        const delButton = document.createElement("button");
        delButton.setAttribute("type", "button");
        delButton.setAttribute("class", "modal-gallerydisplay-item-deletebutton");
        let icon = document.createElement("i");
        icon.setAttribute("class","fa-solid fa-trash-can trash-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("aria-label", "Supprimer la photo");
        
        /* Ajout dans le DOM */
        modalGalleryDisplay.appendChild(galleryElement);
        galleryElement.appendChild(image);
        galleryElement.appendChild(delButton);
        delButton.appendChild(icon);
        setDeleteListener(delButton, works[i].id);
    }
}

function setDeleteListener(button, id) {
    button.addEventListener('click', deleteGalleryItem(id));
}

function deleteGalleryItem(id) {
    return async function (event) {
        event.preventDefault();
        console.log('click');
        console.log(id);
        if (await deleteItem(id)) {
            afficheModalGallery();
        };
    }
}

export { setModifListener, unsetModifListener, openModalGallery };