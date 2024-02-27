

const serverURL = "http://localhost:5678/api/";
const api_works = "works";
const works = await getContents(api_works);
const filtres = await getCategories(works);

let token = window.localStorage.getItem("token");
check_token();

afficheGallery(works);
setListenerToFilters();
setOnCloseListener();


function loginFunction(loginLink) {
    /* Gestion du log in */
    loginLink.innerHTML = "logout";
    loginLink.setAttribute("href","#");

    /* Ajout de la barre du mode édition */
    let header = document.querySelector("header");
    let headerContainer = document.querySelector(".header-container");
    headerContainer.style.paddingTop = "50px";
    
    /* Création des éléments de la barre d'édition */
    let fixedEditionBar = document.createElement("div");
    fixedEditionBar.setAttribute("id","mode-edition");
    fixedEditionBar.style.cssText = "position: fixed; left: 0; height: 3.75em; width: 100%; display: flex; flex-direction: row; justify-content: center; align-items: center; background-color: #000000; color: #FFFFFF;";

    let editionParagraph = document.createElement("span");
    editionParagraph.style.paddingLeft = "1em";
    editionParagraph.innerHTML = "Mode édition";

    let iconInverted = document.createElement("i");
    iconInverted.setAttribute("class","fa-regular fa-pen-to-square");
    iconInverted.setAttribute("aria-hidden","true");
    iconInverted.style.cssText = "color: #FFFFFF;";

    /* Création du lien de modification des projets */
    let projetContainer = document.querySelector("#title-projets-container");

    let lienModifier = document.createElement("a");
    lienModifier.setAttribute("id","modification");
    lienModifier.setAttribute("href","");
    lienModifier.style.cssText = "padding-left: 2em; padding-top: 0.6em;"
    let icon = document.createElement("i");
    icon.setAttribute("class","fa-regular fa-pen-to-square");
    icon.setAttribute("aria-hidden","true");
    let modifier = document.createElement("span");
    modifier.style.cssText = "padding-left: 1em; padding-top: 0;";
    modifier.innerHTML = "Modifier";

    /* Ajout dans le DOM */
    header.insertBefore(fixedEditionBar, headerContainer);
    fixedEditionBar.appendChild(iconInverted);
    fixedEditionBar.appendChild(editionParagraph);

    projetContainer.appendChild(lienModifier);
    lienModifier.appendChild(icon);
    lienModifier.appendChild(modifier);

    /* Suppression des filtres */
    let filterContainer = document.querySelector(".filters");
    filterContainer.replaceChildren();

    setModifListener();
}


function logoutFunction(loginLink) {
    /* Gestion du log out */
    window.localStorage.removeItem("token");
    token = null;
    loginLink.innerHTML = "login";
    loginLink.setAttribute("href","login.html");

    /* Suppression de la barre d'édition */
    let fixedEditionBar = document.querySelector("#mode-edition");
    fixedEditionBar.remove();

    let headerContainer = document.querySelector(".header-container");
    headerContainer.removeAttribute("style");

    /* Suppression du lien de modification des projets */
    let modifLink = document.querySelector("#modification");
    modifLink.remove();

    afficheFiltres(filtres);
}


function check_token() {
    let loginLink = document.querySelector("#login-link");

    /* gestion du lien login/logout en fonction de la présence du token */
    if (token !== null) {
        loginFunction(loginLink);
    } else {
        afficheFiltres(filtres);
    }

    /* ajout de l'évènement logout */
    loginLink.addEventListener('click', (event) => {
        if (loginLink.innerHTML === "logout") {
            event.preventDefault();
            logoutFunction(loginLink);
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


function setModifListener() {
    let modifLink = document.querySelector("#modification");

    modifLink.addEventListener('click', (event) => {
        event.preventDefault();
        /*** TODO ***/
        /* Affiche la modale */
        /* add listener sur les corbeilles et le bouton ajouter */
    });
}