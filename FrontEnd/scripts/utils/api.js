const serverURL = "http://localhost:5678/api/";
const api_works = "works";
const users_login = "users/login";



async function checkLogin(user,pwd) {
    /* POST login */
    let toCheck = JSON.stringify({
        email: user,
        password: pwd
    });
    let serverResponse = await fetch(`${serverURL}${users_login}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: toCheck});

    let toReturn = Array();
    switch (serverResponse.status) {
        case 200: {
            let serverResponseJson = await serverResponse.json();
            toReturn = [true, serverResponseJson.token];
            break;
        }
        default: {
            toReturn = [false, "L'adresse e-mail ou le mot de passe est erroné"];
            console.clear();
            break;
        }
    }

    return toReturn;
}


async function getContents() {
    /* GET works */
    let serverResponse = await fetch(`${serverURL}${api_works}`).then(serverResponse => serverResponse.json());
    return serverResponse;
}


async function deleteItem(id) {
    /* DELETE works */
    let token = window.localStorage.getItem("token");

    let serverResponse = await fetch (`${serverURL}${api_works}\\${id}`, {
        method: "DELETE",
        headers: {"Authorization": "Bearer " + token}
    });

    switch (serverResponse.status) {
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

    let serverResponse = await fetch(`${serverURL}${api_works}`, {
        method: "POST",
        headers: {"Authorization": "Bearer " + token},
        body: formData});
 
    if (serverResponse.status <= 204) {
        return true;
    } else {
        return false;
    }          
}



export { checkLogin, getContents, deleteItem, appendItem };