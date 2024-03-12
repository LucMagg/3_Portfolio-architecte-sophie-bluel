import { getContents, appendItem } from "../utils/api.js";
import { openModalGallery } from "./modalGallery.js";
import { displayGallery, getCategories } from "../utils/gallery.js";


const modalAddPhoto = document.getElementById("modal-ajoutphoto");
const modalContainer = document.getElementById("modal-ajoutphoto-container");
const modalCloseButton = document.getElementById("modal-ajoutphoto-closeicon");
const modalBackButton = document.getElementById("modal-ajoutphoto-backicon");
const modalForm = document.getElementById("modal-ajoutphoto-form");
const modalFormTitle = document.getElementById("modal-ajoutphoto-titre");
const modalAddPhotoContainer = document.getElementById("modal-ajoutphoto-addphoto-container");
const modalFormInputFileHidden = document.getElementById("modal-ajoutphoto-addphoto-hidden");
const modalErrorField = document.getElementById("modal-ajoutphoto-errorfield");
const modalAddPhotoButton = document.getElementById("modal-ajoutphoto-addphoto-button");
const modalFormSelector = document.getElementById("modal-ajoutphoto-categorie");
const modalSubmitButton = document.getElementById("modal-ajoutphoto-valider");

const maxUploadFileSize = 4194304;
const authorisedUploadFileExtensions = ['png','jpg'];



function openModalAddPhoto() {
    modalAddPhoto.showModal();
    displayModalCategories();
    showContainerItems();
}


function closeModalAddPhoto() {
    modalAddPhoto.close();
    removePreview();
    showContainerItems();
    modalForm.reset();
    desactivateSubmitButton();
}


function setModalAddPhotoListeners() {
    modalAddPhoto.addEventListener("click", closeModalListener);
    modalContainer.addEventListener("click", modalPropagationStop);
    modalCloseButton.addEventListener("click", closeModalListener);
    modalBackButton.addEventListener("click", openLastModal);
    modalAddPhotoButton.addEventListener("click", addPhoto);
    modalFormInputFileHidden.addEventListener("change", checkNewPhoto);
    modalFormInputFileHidden.addEventListener("change", checkFormChange);
    modalFormTitle.addEventListener("change", checkFormChange);
    modalFormSelector.addEventListener("change", checkFormChange);
    modalSubmitButton.addEventListener("click", submitNewPhoto);
    desactivateSubmitButton();
}


const closeModalListener = function(event) {
    event.preventDefault();
    closeModalAddPhoto();
    displayGallery();
}


const modalPropagationStop = function(event) {
    event.stopPropagation();
}


const openLastModal = function(event) {
    event.preventDefault();
    closeModalAddPhoto();
    openModalGallery();
}


const addPhoto = function() {
    modalFormInputFileHidden.click();
}


async function displayModalCategories() {
    let filtres = getCategories(await getContents());
    modalFormSelector.innerHTML = "";

    let optionText = "";
    let optionValue = "";
    for (let i = 0; i < filtres.length; i++) {
        if (filtres[i].name !== "Tous") {
            optionText = filtres[i].name;
            optionValue = filtres[i].id;
        } else {
            optionText = "";
            optionValue = "0";
        }
        const option = document.createElement("option");
        option.setAttribute("value", optionValue);
        option.innerText = optionText;
        modalFormSelector.appendChild(option);
    }
}


const checkNewPhoto = function() {
    let uploadedFile = modalFormInputFileHidden.files[0];
    if (uploadedFile !== null) {
        if (uploadedFile.size > maxUploadFileSize) {
            displayFileError(`Le fichier est trop volumineux (${(uploadedFile.size/ 1048576).toFixed(1)} Mo)`);
        } else if (authorisedUploadFileExtensions.indexOf(uploadedFile.name.split('.')[1]) === -1) {
            displayFileError(`L'extension du fichier (.${uploadedFile.name.split('.')[1]}) n'est pas autorisée`);
        } else {
            displayPreview(uploadedFile);
        }
    }
}


function displayFileError(message) {
    modalFormInputFileHidden.value = "";
    modalErrorField.removeAttribute("style");
    modalErrorField.innerHTML = message;
    modalAddPhotoContainer.querySelector("i").style.opacity = "0";
}


function hideFileError() {
    modalErrorField.style.display = "None";
    modalErrorField.innerHTML = "";
    modalAddPhotoContainer.querySelector("i").removeAttribute("style");
}


function showContainerItems() {
    for (let i = 0; i < modalAddPhotoContainer.children.length; i++) {
        if (modalAddPhotoContainer.children[i].id !== "modal-ajoutphoto-errorfield") {
            modalAddPhotoContainer.children[i].removeAttribute("style");
        }
    };
    hideFileError();
}


function hideContainerItems() {
    hideFileError();
    for (let i = 0; i < modalAddPhotoContainer.children.length; i++) {
        if (modalAddPhotoContainer.children[i].id !== "modal-ajoutphoto-errorfield") {
            modalAddPhotoContainer.children[i].style.display = "None";
        }
    };
}


function displayPreview(uploadedFile) {
    const previewImage = document.createElement("img");
    previewImage.setAttribute("src", URL.createObjectURL(uploadedFile));
    previewImage.setAttribute("alt", uploadedFile.name);
    previewImage.setAttribute("id", "modal-ajoutphoto-preview");
    
    hideContainerItems();
    modalAddPhotoContainer.appendChild(previewImage);
}


function removePreview() {
    let preview = document.getElementById("modal-ajoutphoto-preview");
    if (preview !== null) {
        preview.remove();
    }
}


const checkFormChange = function () {
    if ((modalFormInputFileHidden.files[0] !== undefined) && (modalFormTitle.value !== "") && (modalFormSelector.value !== "0")) {
        activateSubmitButton();
    } else {
        desactivateSubmitButton();
    }
}


function activateSubmitButton() {
    modalSubmitButton.classList.replace("button-disabled", "button-enabled");
}


function desactivateSubmitButton() {
    modalSubmitButton.classList.replace("button-enabled", "button-disabled");
}


const submitNewPhoto = async function(event) {
    event.preventDefault();
    if (modalSubmitButton.classList.contains("button-enabled")) {
        let isOk = await appendItem(modalFormInputFileHidden.files[0], modalFormTitle.value, modalFormSelector.value);
        if (isOk) {
            closeModalAddPhoto();
            displayGallery();
        }
    }
}



export { openModalAddPhoto, setModalAddPhotoListeners };