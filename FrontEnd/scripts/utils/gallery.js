import { getContents } from "./api.js";

const gallery = document.getElementById("portfolio__gallery");
const modalGalleryDisplay = document.getElementById("modal-gallery__gallerydisplay");


async function displayGallery(works) {
    if (works === undefined) {
        works = await getContents();
    }
    gallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        /* Construction du html de chaque photo */
        const galleryElement = document.createElement("figure");
        const image = document.createElement("img");
        image.setAttribute("src", works[i].imageUrl);
        image.setAttribute("alt", works[i].title);
        const title = document.createElement("figcaption");
        title.innerText = works[i].title;

        /* Ajout dans le DOM */
        gallery.appendChild(galleryElement);
        galleryElement.appendChild(image);
        galleryElement.appendChild(title);
    }
    return works;
}


function getCategories(works) {
    let toReturn = [{"id": 0, "name": "Tous"}];
    for (let i = 0; i < works.length; i++) {
        if (!toReturn.some(item => item.id === works[i].category.id)) {
            toReturn.push(works[i].category);
        }
    }
    return toReturn;
}


async function displayModalGallery(works) {
    if (works === undefined) {
        works = await getContents();
    }
        
    modalGalleryDisplay.innerHTML = "";
    
    let toReturn = [];
    for (let i = 0; i < works.length; i++) {
        /* Construction du html de chaque photo */
        const galleryElement = document.createElement("figure");
        galleryElement.classList.add("modal-gallery__gallerydisplay__item");
        const image = document.createElement("img");
        image.setAttribute("src", works[i].imageUrl);
        image.setAttribute("alt", works[i].title);
        image.setAttribute("id", "gallery-id-" + works[i].id);
        const delButton = document.createElement("button");
        delButton.setAttribute("type", "button");
        delButton.setAttribute("class", "modal-gallery__gallerydisplay__item__deletebutton");
        delButton.setAttribute("id", "modal-gallery__gallerydisplay__item__deletebutton#" + works[i].id);
        let icon = document.createElement("i");
        icon.setAttribute("class","fa-solid fa-trash-can trash-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("aria-label", "Supprimer la photo");
        
        /* Ajout dans le DOM */
        modalGalleryDisplay.appendChild(galleryElement);
        galleryElement.appendChild(image);
        galleryElement.appendChild(delButton);
        delButton.appendChild(icon);
        toReturn.push(delButton);
    }

    return toReturn;
}


export { displayGallery, getCategories, displayModalGallery };