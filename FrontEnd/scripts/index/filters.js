import { displayGallery, getCategories } from "../utils/gallery.js";
import { getContents } from "../utils/api.js";

const boutonsFiltre = document.querySelectorAll(".boutonFiltre");
const filterContainer = document.querySelector(".filters");



async function displayFilters() {
    const works = await getContents();
    let filtres = getCategories(works);
    
    filterContainer.innerHTML = "";

    for (let i = 0; i < filtres.length; i++) {
        /* Construction du html de chaque filtre */
        const filterButton = document.createElement("button");
        filterButton.setAttribute("type", "button");
        filterButton.setAttribute("value", filtres[i].name);
        filterButton.setAttribute("class", "boutonFiltre");
        filterButton.innerText = filtres[i].name;

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



export { displayFilters, removeFilters };