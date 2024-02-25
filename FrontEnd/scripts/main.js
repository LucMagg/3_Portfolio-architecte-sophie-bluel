const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";

const serverURL = "http://localhost:5678/";
const users = "users";
const login = "users/login";
const categories = "api/categories";
const works = "api/works";

const galleryContent = await getContents(works);
afficheGallery(galleryContent);

async function getContents(whichone) {
    const reponse  = await fetch(`${serverURL}${whichone}`).then(reponse => reponse.json());
 
    console.log(`reponse : ${whichone}`);
    console.log(reponse);

    return reponse;
}

function afficheGallery(galleryContent){
    console.log("here");
    for (let i = 0; i < galleryContent.length; i++) {
        /* Construction du html de chaque photo */
        const galleryElement = document.createElement("figure");
        const image = document.createElement("img");
        image.setAttribute("src", galleryContent[i].imageUrl);
        image.setAttribute("alt", galleryContent[i].title);
        const title = document.createElement("figcaption");
        title.innerText = galleryContent[i].title;

        /* Ajout dans le DOM */
        gallery.appendChild(galleryElement);
        galleryElement.appendChild(image);
        galleryElement.appendChild(title);
    }

}

