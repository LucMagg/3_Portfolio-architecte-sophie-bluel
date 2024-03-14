import { getContents, appendItem } from "../utils/api.js";
import { openModalGallery } from "./modalGallery.js";
import { getCategories } from "../utils/gallery.js";
import { closeModals, modalPropagationStop } from "./modalCommons.js";


const modalAddPhoto = document.getElementById("modal-addphoto");
const modalContainer = document.getElementById("modal-addphoto__container");
const modalCloseButton = document.getElementById("modal-addphoto__closeicon");
const modalBackButton = document.getElementById("modal-addphoto__backicon");
const modalForm = document.getElementById("modal-addphoto__form");
const modalFormTitle = document.getElementById("modal-addphoto__form__title");
const modalAddPhotoContainer = document.getElementById("modal-addphoto__form__picture-container");
const modalFormInputFileHidden = document.getElementById("modal-addphoto__form__picture__hidden");
const modalErrorField = document.getElementById("modal-addphoto__form__picture__errorfield");
const modalAddPhotoButton = document.getElementById("modal-addphoto__form__picture__button");
const modalFormSelector = document.getElementById("modal-addphoto__form__category");
const modalSubmitButton = document.getElementById("modal-addphoto__form__submit");

const maxUploadFileSize = 4194304;
const authorisedUploadFileExtensions = ['png','jpg'];



function openModalAddPhoto(works) {
    modalAddPhoto.classList.remove("modal-not-visible");
    modalAddPhoto.showModal();
    displayModalCategories(works);
    modalForm.reset();
    showContainerItems();
    removePreview();
    modalSubmitButton.classList.replace("button-enabled", "button-disabled");
}


function setModalAddPhotoListeners(works) {
    modalAddPhoto.addEventListener("click", closeModals);
    modalContainer.addEventListener("click", modalPropagationStop);
    modalCloseButton.addEventListener("click", closeModals);
    modalBackButton.addEventListener("click", openLastModal(works));
    modalAddPhotoButton.addEventListener("click", addPhoto);
    modalFormInputFileHidden.addEventListener("change", checkNewPhoto);
    modalForm.addEventListener("change", checkFormChange);
    modalSubmitButton.classList.replace("button-enabled", "button-disabled");
    modalSubmitButton.addEventListener("click", submitNewPhoto);
}


function openLastModal(works) {
    return function (event) {
        event.preventDefault();
        modalAddPhoto.classList.add("modal-not-visible");
        window.setTimeout(() => {
            modalAddPhoto.close();
            openModalGallery(works);
        }, 250);
    }
}


const addPhoto = function() {
    modalFormInputFileHidden.click();
}


function displayModalCategories(works) {
    let filtres = getCategories(works);
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
    modalErrorField.classList.add("error-visible");
    modalErrorField.innerHTML = message;
    modalAddPhotoContainer.querySelector("i").style.opacity = "0";
}


function hideFileError() {
    modalErrorField.classList.remove("error-visible");
    modalErrorField.innerHTML = "";
    modalAddPhotoContainer.querySelector("i").removeAttribute("style");
}


function showContainerItems() {
    for (let i = 0; i < modalAddPhotoContainer.children.length; i++) {
        if (modalAddPhotoContainer.children[i].id !== "modal-addphoto__form__picture__errorfield") {
            modalAddPhotoContainer.children[i].removeAttribute("style");
        }
    };
    hideFileError();
}


function hideContainerItems() {
    hideFileError();
    for (let i = 0; i < modalAddPhotoContainer.children.length; i++) {
        if (modalAddPhotoContainer.children[i].id !== "modal-addphoto__form__picture__errorfield") {
            modalAddPhotoContainer.children[i].style.display = "None";
        }
    };
}


function displayPreview(uploadedFile) {
    const previewImage = document.createElement("img");
    previewImage.setAttribute("src", URL.createObjectURL(uploadedFile));
    previewImage.setAttribute("alt", uploadedFile.name);
    previewImage.setAttribute("id", "modal-addphoto__form__picture__preview");
    
    hideContainerItems();
    modalAddPhotoContainer.appendChild(previewImage);
}


function removePreview() {
    let preview = document.getElementById("modal-addphoto__form__picture__preview");
    if (preview !== null) {
        preview.remove();
    }
}


const checkFormChange = function () {
    if (modalFormInputFileHidden.files[0] !== undefined && 
        modalFormTitle.value !== "" &&
        modalFormSelector.value !== "0") {
        modalSubmitButton.classList.replace("button-disabled", "button-enabled");
    } else {
        modalSubmitButton.classList.replace("button-enabled", "button-disabled");
    }
}


const submitNewPhoto = async function(event) {
    event.preventDefault();
    if (modalSubmitButton.classList.contains("button-enabled")) {
        let isOk = await appendItem(modalFormInputFileHidden.files[0], modalFormTitle.value, modalFormSelector.value);
        if (isOk) {
            closeModals(event);
        }
    }
}



export { openModalAddPhoto, setModalAddPhotoListeners, showContainerItems };