

const serverURL = "http://localhost:5678/api/";
const api_works = "works";

let token = window.localStorage.getItem("token");
check_token();

const works = await getContents(api_works);
const filtres = await getCategories(works);
afficheFiltres(filtres);
afficheGallery(works);
setListenerToFilters();
setOnCloseListener();


function check_token() {
    let loginLink = document.querySelector("#login-link");

    /* gestion du lien login/logout en fonction de la présence du token */
    if (token !== null) {
        loginLink.innerHTML = "logout";
        loginLink.setAttribute("href","#");
    }

    /* ajout de l'évènement logout */
    loginLink.addEventListener('click', (event) => {
        if (loginLink.innerHTML === "logout") {
            event.preventDefault();
            window.localStorage.removeItem("token");
            token = null;
            loginLink.innerHTML = "login";
            loginLink.setAttribute("href","login.html");
        }
    });

}

export async function getContents(whichone) {
    let reponse = window.localStorage.getItem(whichone);

    if (reponse === null) {
        reponse = await fetch(`${serverURL}${whichone}`).then(reponse => reponse.json());
        window.localStorage.setItem(whichone,JSON.stringify(reponse));
    } else {
        reponse = JSON.parse(reponse);
    }
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


function setListenerToFilters() {
    const boutonsFiltre = document.querySelectorAll(".boutonFiltre");
    boutonsFiltre.forEach(bouton => {
        bouton.addEventListener('click', () => {
            let worksToDisplay = works.filter((work) => work.category.name === bouton.value);
            if (worksToDisplay.length === 0) {  /* Cas du bouton "Tous" qui n'appartient pas aux catégories */
                worksToDisplay = works;
            }
            afficheGallery(worksToDisplay);
        });
    });
}


function setOnCloseListener() {
    /* Nettoyage du localStorage à la fermeture de la page */
    window.addEventListener('beforeunload', (event) => {
        window.localStorage.removeItem(api_works);
        window.localStorage.removeItem("token");
    });
}