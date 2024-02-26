

const serverURL = "http://localhost:5678/";
const users = "users";
const users_login = "users/login";
/*const api_categories = "api/categories";*/
const api_works = "api/works";

const works = await getContents(api_works);
const filtres = getCategories(works);
console.log(filtres);
afficheFiltres(filtres);
afficheGallery(works);

const boutonsFiltre = document.querySelectorAll(".boutonFiltre");
setListenerToFilters(boutonsFiltre);

function setListenerToFilters(boutonsFiltre) {
    boutonsFiltre.forEach(bouton => {
        bouton.addEventListener('click', () => {
            console.log(`${bouton.value}`);
            let worksToDisplay = works.filter((work) => work.category.name === bouton.value);
            if (worksToDisplay.length === 0) {  /* Cas du bouton "Tous" qui n'appartient pas aux catégories */
                worksToDisplay = works;
            }
            afficheGallery(worksToDisplay);
        });
    });
}


async function getContents(whichone) {
    const reponse  = await fetch(`${serverURL}${whichone}`).then(reponse => reponse.json());
 
    console.log(`reponse : ${whichone}`);
    console.log(reponse);

    return reponse;
}

function afficheFiltres(filtres) {
    /* Effacement du contenu des filtres */
    const filterContainer = document.querySelector(".filters");
    filterContainer.innerHTML = "";

    for (let i = 0; i < filtres.length; i++) {
        /* Construction du html de chaque filtre */
        const filterElement = document.createElement("button");
        filterElement.setAttribute("type","button");
        filterElement.setAttribute("value",filtres[i]);
        filterElement.setAttribute("class","boutonFiltre");
        filterElement.innerText = filtres[i].replace("Hotel","Hôtel");

        /* Ajout dans le DOM */
        filterContainer.appendChild(filterElement);
    }
}


function afficheGallery(works) {
    /* Effacement du contenu de la galerie */
    const gallery = document.querySelector(".gallery");
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

function getCategories(works) {
    let reponse = new Set();
    reponse.add("Tous");
    for (let i = 0; i < works.length; i++) {
        reponse.add(works[i].category.name);
    }
    return Array.from(reponse);
}


