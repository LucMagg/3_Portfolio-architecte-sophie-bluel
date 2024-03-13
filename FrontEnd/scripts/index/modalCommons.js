import { displayGallery } from "../utils/gallery.js";


const modalGallery = document.getElementById("modal-gallery");
const modalAddPhoto = document.getElementById("modal-addphoto");



const closeModals = function(event) {
    event.preventDefault();
    modalAddPhoto.close();
    modalGallery.close();
    displayGallery();
}


const modalPropagationStop = function(event) {
    event.stopPropagation();
}


export { closeModals, modalPropagationStop };