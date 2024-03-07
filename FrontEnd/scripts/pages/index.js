import { check_token } from "../utils/loghandler.js";
import { displayGallery } from "../utils/filters.js";



check_token();
displayGallery();
setOnCloseListener();


function setOnCloseListener() {
    /* Nettoyage du localStorage à la fermeture de la page */
    window.addEventListener('beforeunload', () => {
        window.localStorage.removeItem("token");
    });
}

