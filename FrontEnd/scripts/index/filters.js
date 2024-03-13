import { displayGallery, getCategories } from "../utils/gallery.js";
import { getContents } from "../utils/api.js";


const filterContainer = document.getElementById("portfolio__filters");



async function displayFilters(works) {
    if (works === undefined) {
        works = await getContents();
    }

    let filterList = getCategories(works);
    
    filterContainer.innerHTML = "";
    for (let i = 0; i < filterList.length; i++) {
        /* Construction du html de chaque filtre */
        const filterButton = document.createElement("button");
        filterButton.setAttribute("type", "button");
        filterButton.setAttribute("value", filterList[i].name);
        filterButton.classList.add("portfolio__filters__button");
        filterButton.innerText = filterList[i].name;

        /* Ajout dans le DOM */
        filterContainer.appendChild(filterButton);
        filterButton.addEventListener('click', createFilterListener(works, filterButton));
    }
}


function createFilterListener(works, filterButton) {
    return function() {
        filterGallery(works, filterButton);
    };
}


async function filterGallery(works, filterButton) {
    let worksToDisplay = works.filter((work) => work.category.name === filterButton.value);
    if (worksToDisplay.length === 0) {  /* Cas du bouton "Tous" qui n'appartient pas aux catégories */
        worksToDisplay = works;
    }
    displayGallery(worksToDisplay);
}


function removeFilters() {
    filterContainer.innerHTML = "";
    
    let boutonsFiltre = document.querySelectorAll(".portfolio__filters__button");
    boutonsFiltre.forEach(filterButton => {
        bouton.removeEventListener('click', createFilterListener(filterButton));
    });
}



export { displayFilters, removeFilters };