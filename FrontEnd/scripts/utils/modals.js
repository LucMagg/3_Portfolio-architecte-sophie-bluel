const modalGallery = document.getElementById("modal-gallery");
const modalGalleryDisplay = document.getElementById("modal-gallery-gallerydisplay");
const modalGalleryButton = document.getElementById("modal-gallery-button");

const modalAddPhoto = document.getElementById("modal-ajoutphoto");
const modalAddphotoBack = document.getElementById("modal-ajoutphoto-backicon");
const inputFileHidden = document.getElementById("modal-ajoutphoto-addphoto-hidden");
const modalAddPhotoButton = document.getElementById("modal-ajoutphoto-addphoto-button")
const maxUploadFileSize = 4194304;
const authorisedUploadFileExtensions = ['png','jpg'];

const modalError = document.getElementById("modal-error");




function setModifListener(works) {
    let modifLink = document.querySelector("#modification");

    modifLink.addEventListener('click', (event) => {
        event.preventDefault();
        /* Affiche la modale */      
        modalGallery.showModal();
        setModalCloseListeners(modalGallery);
    
        /****** TODO : add listener sur les corbeilles ******/

        afficheModalGallery(works);
        modalGalleryButton.addEventListener("click", () =>{
            modalGallery.close();
            modalAddPhoto.showModal();
            setModalCloseListeners(modalAddPhoto);
            
            modalAddphotoBack.addEventListener("click", (event) =>{
                event.preventDefault();
                modalAddPhoto.close();
                modalGallery.showModal();
            });

            
            modalAddPhotoButton.addEventListener("click", () => {
                console.log("CLICK!!!");
                inputFileHidden.click();
            })

            inputFileHidden.addEventListener("change", () => {
                let myFile = inputFile.files[0];
                if (myFile !== null) {
                    if (myFile.size > maxUploadFileSize) {
                        afficheErrorModal("Le fichier est trop volumineux", inputFile);
                    }
                    if (authorisedUploadFileExtensions.indexOf(myFile.name.split('.')[1]) === -1) {
                        afficheErrorModal("L'extension du fichier n'est pas autorisée", inputFile.Files[0]);
                    }
                }
            })

            afficheModalCategories(modalAddPhoto);
        });


    });
}


function afficheErrorModal(errorMessage, inputFile) {
    modalError.querySelector("#modal-error-message").innerText = errorMessage;
    inputFile = null;
    modalError.showModal();
    modalError.querySelector("#modal-error-close").addEventListener("click", () => {
        modalError.close();
    });
}


function setModalCloseListeners(modal) {
    modal.addEventListener('click', () => {    
        modal.close();
    });
    modal.querySelector(".modal-container").addEventListener("click", (event) => {
        event.stopPropagation();
    });

    modal.querySelector(".modal-closeicon").addEventListener("click", (event) => {
        event.preventDefault();
        if (modalAddPhoto.open) modalAddPhoto.close();
        if (modalGallery.open) modalGallery.close();
        if (modalError.open) modalError.close();
    });
}


function afficheModalGallery(works) {
    console.log(modalGallery);
    modalGalleryDisplay.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        /* Construction du html de chaque photo */
        const galleryElement = document.createElement("figure");
        galleryElement.setAttribute("class", "modal-gallerydisplay-item");
        const image = document.createElement("img");
        image.setAttribute("src", works[i].imageUrl);
        image.setAttribute("alt", works[i].title);
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
    }
}

function afficheModalCategories(modal) {
    const modalSelector = modal.querySelector("#categorie");

    for (let i = 1; i < filtres.length; i++) {
        /* Construction du html de chaque element de la liste */
        const option = document.createElement("option");
        option.setAttribute("value", filtres[i]);
        option.innerText = filtres[i];
        /* Ajout dans le DOM */
        modalSelector.appendChild(option);
    }
}

export { setModifListener };