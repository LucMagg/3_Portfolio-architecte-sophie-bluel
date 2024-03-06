import { getContents } from "./api.js";

const boutonsFiltre = document.querySelectorAll(".boutonFiltre");
const filterContainer = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");

function getCategories(works) {
    let reponse = new Set();
    reponse.add("Tous");
    for (let i = 0; i < works.length; i++) {
        reponse.add(works[i].category.name);
    }
    return Array.from(reponse);
}

async function displayFilters() {
    const works = await getContents();
    let filtres = getCategories(works);
    filterContainer.innerHTML = "";

    for (let i = 0; i < filtres.length; i++) {
        /* Construction du html de chaque filtre */
        const filterButton = document.createElement("button");
        filterButton.setAttribute("type", "button");
        filterButton.setAttribute("value", filtres[i]);
        filterButton.setAttribute("class", "boutonFiltre");
        filterButton.innerText = filtres[i];

        /* Ajout dans le DOM */
        filterContainer.appendChild(filterButton);
        filterButton.addEventListener('click', createFilterListener(works, filterButton));
    }
}

function createFilterListener(works, filterButton) {
    return function() {
        filtreGallery(works, filterButton);
    };
}

async function filtreGallery(works, filterButton) {
    let worksToDisplay = works.filter((work) => work.category.name === filterButton.value);
    if (worksToDisplay.length === 0) {  /* Cas du bouton "Tous" qui n'appartient pas aux catégories */
        worksToDisplay = works;
    }
    displayGallery(worksToDisplay);
}

function removeFilters() {
    filterContainer.innerHTML = "";
    
    boutonsFiltre.forEach(filterButton => {
        bouton.removeEventListener('click', createFilterListener(filterButton));
    });
}


async function displayGallery(works) {
    /* Effacement du contenu de la galerie */
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
}


export { getCategories, displayFilters, removeFilters, displayGallery }