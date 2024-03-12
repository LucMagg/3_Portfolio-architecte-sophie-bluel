import { deleteItem } from "../utils/api.js";
import { displayGallery, displayModalGallery } from "../utils/gallery.js";
import { openModalAddPhoto } from "./modalAddPhoto.js";

const modifLink = document.getElementById("modification");

const modalGallery = document.getElementById("modal-gallery");
const modalContainer = document.getElementById("modal-gallery-container");
const modalButton = document.getElementById("modal-gallery-button");
const modalCloseButton = document.getElementById("modal-gallery-closeicon");



async function openModalGallery() { 
    modalGallery.showModal();
    let delButtonList = await displayModalGallery();
    setDeleteListeners(delButtonList);
}


function closeModalGallery() {
    modalGallery.close();
    displayGallery();
}


function setModalGalleryListeners() {
    modalGallery.addEventListener("click", closeListener);
    modalContainer.addEventListener("click", modalStop);
    modalCloseButton.addEventListener("click", closeListener);
    modalButton.addEventListener("click", openNextModal);
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



function setDeleteListeners(delButtonList) {
    delButtonList.forEach(button => {
        let id = button.id.split('#')[1];
        button.addEventListener('click', deleteGalleryItem(id));
    });
}


function deleteGalleryItem(id) {
    return async function (event) {
        event.preventDefault();
        console.log('click');
        console.log(id);
        if (await deleteItem(id)) {
            displayModalGallery();
        };
    }
}



export { openModalGallery, setModalGalleryListeners };