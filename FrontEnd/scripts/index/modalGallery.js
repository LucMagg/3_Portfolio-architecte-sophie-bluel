import { deleteItem } from "../utils/api.js";
import { displayModalGallery } from "../utils/gallery.js";
import { openModalAddPhoto } from "./modalAddPhoto.js";
import { closeModals, modalPropagationStop } from "./modalCommons.js";


const modalGallery = document.getElementById("modal-gallery");
const modalContainer = document.getElementById("modal-gallery__container");
const modalButton = document.getElementById("modal-gallery__button");
const modalCloseButton = document.getElementById("modal-gallery__closeicon");



function openModalGallery(works) {
    modalGallery.classList.remove("modal-not-visible");
    modalGallery.showModal();
    showModalGallery(works);
}


async function showModalGallery(works) {
    let delButtonList = await displayModalGallery(works);
    setDeleteListeners(delButtonList);
}

function setModalGalleryListeners(works) {
    modalGallery.addEventListener("click", closeModals);
    modalContainer.addEventListener("click", modalPropagationStop);
    modalCloseButton.addEventListener("click", closeModals);
    modalButton.addEventListener("click", openNextModal(works));
}


function openNextModal(works) {
    return function(event) {
        event.preventDefault();
        modalGallery.classList.add("modal-not-visible");
        window.setTimeout(() => {
            modalGallery.close();
            openModalAddPhoto(works);
        }, 250);
    }
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
            showModalGallery();
        };
    }
}



export { openModalGallery, setModalGalleryListeners };