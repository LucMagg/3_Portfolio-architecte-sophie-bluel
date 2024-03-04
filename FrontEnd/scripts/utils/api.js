const serverURL = "http://localhost:5678/api/";
const api_works = "works";
const users_login = "users/login";


async function checkLogin(user,pwd) {

    let toCheck = JSON.stringify({
        email: user,
        password: pwd
    });

    let reponse = await fetch(`${serverURL}${users_login}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: toCheck});

    console.log(reponse.status);
    
    let to_return = Array();
    switch (reponse.status) {
        case 200: {
            let reponseJson = await reponse.json();
            to_return = [true, reponseJson.token];
            break;
        }
        default: {
            to_return = [false, "L'adresse e-mail ou le mot de passe est erroné"];
            break;
        }
    }

    return to_return;
}


async function getContents() {
    let reponse = await fetch(`${serverURL}${api_works}`).then(reponse => reponse.json());
    return reponse;
}

export { checkLogin, getContents };