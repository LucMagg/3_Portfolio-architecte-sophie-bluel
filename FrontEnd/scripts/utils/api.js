const serverURL = "http://localhost:5678/api/";
const api_works = "works";
const users_login = "users/login";



async function checkLogin(user,pwd) {
    /* POST login */
    let toCheck = JSON.stringify({
        email: user,
        password: pwd
    });
    let reponse = await fetch(`${serverURL}${users_login}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: toCheck});

    let to_return = Array();
    switch (reponse.status) {
        case 200: {
            let reponseJson = await reponse.json();
            to_return = [true, reponseJson.token];
            break;
        }
        default: {
            to_return = [false, "L'adresse e-mail ou le mot de passe est erroné"];
            console.clear();
            break;
        }
    }

    return to_return;
}


async function getContents() {
    /* GET works */
    let reponse = await fetch(`${serverURL}${api_works}`).then(reponse => reponse.json());
    return reponse;
}


async function deleteItem(id) {
    /* DELETE works */
    let token = window.localStorage.getItem("token");

    let reponse = await fetch (`${serverURL}${api_works}\\${id}`, {
        method: "DELETE",
        headers: {"Authorization": "Bearer " + token}
    });

    switch (reponse.status) {
        case 200, 204: {
            return true;
        }
        default: {
            return false;
        }
    }
}


async function appendItem(image, title, categoryId) {
    /* POST works */
    let token = window.localStorage.getItem("token");

    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", categoryId);

    let reponse = await fetch(`${serverURL}${api_works}`, {
        method: "POST",
        headers: {"Authorization": "Bearer " + token},
        body: formData});
 
    if (reponse.status <= 204) {
        return true;
    } else {
        return false;
    }          
}



export { checkLogin, getContents, deleteItem, appendItem };