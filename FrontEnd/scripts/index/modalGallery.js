import { deleteItem } from "../utils/api.js";
import { displayGallery, displayModalGallery } from "../utils/gallery.js";
import { openModalAddPhoto } from "./modalAddPhoto.js";


const modalGallery = document.getElementById("modal-gallery");
const modalContainer = document.getElementById("modal-gallery__container");
const modalButton = document.getElementById("modal-gallery__button");
const modalCloseButton = document.getElementById("modal-gallery__closeicon");



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
    modalGallery.addEventListener("click", closeModalListener);
    modalContainer.addEventListener("click", modalPropagationStop);
    modalCloseButton.addEventListener("click", closeModalListener);
    modalButton.addEventListener("click", openNextModal);
}


const closeModalListener = function(event) {
    event.preventDefault();
    closeModalGallery();
}


const modalPropagationStop = function(event) {
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
        if (await deleteItem(id)) {
            displayModalGallery();
        };
    }
}



export { openModalGallery, setModalGalleryListeners };