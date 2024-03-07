import { getContents, appendItem } from "./api.js";
import { getCategories, displayGallery } from "./filters.js";
import { openModalGallery } from "./modal-gallery.js";

const modalAddPhoto = document.getElementById("modal-ajoutphoto");
const modalContainer = document.getElementById("modal-ajoutphoto-container");
const modalCloseButton = document.getElementById("modal-ajoutphoto-closeicon");
const modalBackButton = document.getElementById("modal-ajoutphoto-backicon");
const modalForm = document.getElementById("modal-ajoutphoto-form");
const modalFormTitle = document.getElementById("modal-ajoutphoto-titre");
const modalAjoutPhotoContainer = document.getElementById("modal-ajoutphoto-addphoto-container");
const modalFormInputFileHidden = document.getElementById("modal-ajoutphoto-addphoto-hidden");
const modalErrorField = document.getElementById("modal-ajoutphoto-errorfield");
const modalAddPhotoButton = document.getElementById("modal-ajoutphoto-addphoto-button");
const modalFormSelector = document.getElementById("modal-ajoutphoto-categorie");
const modalSubmitButton = document.getElementById("modal-ajoutphoto-valider");

const maxUploadFileSize = 4194304;
const authorisedUploadFileExtensions = ['png','jpg'];



function openModalAddPhoto() {
    modalAddPhoto.showModal();
    setListeners();
    afficheModalCategories();
    showContainerItems();
}


function closeModalAddPhoto() {
    modalAddPhoto.close();
    unsetListeners();
    removePreview();
    showContainerItems();
    modalForm.reset();
}


function setListeners() {
    modalAddPhoto.addEventListener("click", closeListener);
    modalContainer.addEventListener("click", modalStop);
    modalCloseButton.addEventListener("click", closeListener);
    modalBackButton.addEventListener("click", openLastModal);
    modalAddPhotoButton.addEventListener("click", addPhoto);
    modalFormInputFileHidden.addEventListener("change", checkNewPhoto);
    modalFormInputFileHidden.addEventListener("change", checkFormChange);
    modalFormTitle.addEventListener("change", checkFormChange);
    modalFormSelector.addEventListener("change", checkFormChange);
    modalSubmitButton.addEventListener("click", submitNewPhoto);
    desactivateSubmitButton();
}


function unsetListeners() {
    modalAddPhoto.removeEventListener("click", closeListener);
    modalContainer.removeEventListener("click", modalStop);
    modalCloseButton.removeEventListener("click", closeListener);
    modalBackButton.removeEventListener("click", openLastModal);
    modalAddPhotoButton.removeEventListener("click", addPhoto);
    modalFormInputFileHidden.removeEventListener("change", checkNewPhoto);
    modalFormInputFileHidden.removeEventListener("change", checkFormChange);
    modalFormTitle.removeEventListener("change", checkFormChange);
    modalFormSelector.removeEventListener("change", checkFormChange);
    modalSubmitButton.removeEventListener("click", submitNewPhoto);
    desactivateSubmitButton();
}


const closeListener = function(event) {
    event.preventDefault();
    closeModalAddPhoto();
    displayGallery();
}


const modalStop = function(event) {
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


async function afficheModalCategories() {
    let filtres = getCategories(await getContents());
    modalFormSelector.innerHTML = "";

    let optionText = "";
    for (let i = 0; i < filtres.length; i++) {
        if (filtres[i] === 'Tous') {
            optionText = "";
        } else {
            optionText = filtres[i];
        }
        const option = document.createElement("option");
        option.setAttribute("value", optionText);
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
    modalAjoutPhotoContainer.querySelector("i").style.opacity = "0";
}


function hideFileError() {
    modalErrorField.style.display = "None";
    modalErrorField.innerHTML = "";
    modalAjoutPhotoContainer.querySelector("i").removeAttribute("style");
}


function showContainerItems() {
    for (let i = 0; i < modalAjoutPhotoContainer.children.length; i++) {
        if (modalAjoutPhotoContainer.children[i].id !== "modal-ajoutphoto-errorfield") {
            modalAjoutPhotoContainer.children[i].removeAttribute("style");
        }
    };
    hideFileError();
}


function hideContainerItems() {
    hideFileError();
    for (let i = 0; i < modalAjoutPhotoContainer.children.length; i++) {
        if (modalAjoutPhotoContainer.children[i].id !== "modal-ajoutphoto-errorfield") {
            modalAjoutPhotoContainer.children[i].style.display = "None";
        }
    };
}


function displayPreview(uploadedFile) {
    const previewImage = document.createElement("img");
    previewImage.setAttribute("src", URL.createObjectURL(uploadedFile));
    previewImage.setAttribute("alt", uploadedFile.name);
    previewImage.setAttribute("id", "modal-ajoutphoto-preview");
    
    hideContainerItems();
    modalAjoutPhotoContainer.appendChild(previewImage);
}


function removePreview() {
    let preview = document.getElementById("modal-ajoutphoto-preview");
    if (preview !== null) {
        preview.remove();
    }
}


const checkFormChange = function () {
    if (!(modalFormInputFileHidden.files[0] === undefined) && !(modalFormTitle.value === null || modalFormTitle.value === "") && !(modalFormSelector.value === "")) {
        activateSubmitButton();
    } else {
        desactivateSubmitButton();
    }
}


function activateSubmitButton() {
    modalSubmitButton.setAttribute("class","modal-button button-enabled");
}


function desactivateSubmitButton() {
    modalSubmitButton.setAttribute("class","modal-button button-disabled");
}


const submitNewPhoto = async function(event) {
    event.preventDefault();
    if (modalSubmitButton.getAttribute("class") === "modal-button button-enabled") {
        let isOk = await appendItem(modalFormInputFileHidden.files[0], modalFormTitle.value, modalFormSelector.value);
        if (isOk) {
            closeModalAddPhoto();
            displayGallery();
        }
    }
}



export { openModalAddPhoto };