import { displayGallery } from "../utils/gallery.js";


const modalGallery = document.getElementById("modal-gallery");
const modalAddPhoto = document.getElementById("modal-addphoto");



const closeModals = function(event) {
    event.preventDefault();
    if (!(modalAddPhoto.classList.contains("modal-not-visible"))) {
        modalAddPhoto.classList.add("modal-not-visible");
    }
    if (!(modalGallery.classList.contains("modal-not-visible"))) {
        modalGallery.classList.add("modal-not-visible");
    }
    window.setTimeout(() => {
        modalAddPhoto.close();
        modalGallery.close();
    },250);
    displayGallery();
}


const modalPropagationStop = function(event) {
    event.stopPropagation();
}


export { closeModals, modalPropagationStop };