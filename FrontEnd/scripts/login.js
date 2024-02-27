const serverURL = "http://localhost:5678/api/";
const errorField = document.querySelector("#login-message");
setListenerToLoginButton();


async function checkLogin(user,pwd) {
    let users_login = "users/login";
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
        case 401: {
            to_return = [false, "Le mot de passe est erroné"];
            break;
        }
        case 404: {
            to_return = [false, "L'adresse e-mail saisie n'est pas reconnue"];
            break;
        }
    }
    return to_return;
}


function setListenerToLoginButton() {
    const loginForm = document.querySelector(".login-form");
    
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let return_msg = "";
        /* Check des potentielles erreurs du formulaire de login */
        let emailValue = event.target.querySelector("[name=email]").value;
        let emailRegex = new RegExp("[a-z]{1}[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
        if (emailValue === "") { /* Cas du champ e-mail vide */
            return_msg = "Veuillez entrer une adresse e-mail";
        } else if (emailRegex.test(emailValue) === false) { /* Cas de l'e-mail qui ne correspond pas à une adresse e-mail valide */
            return_msg = "Veuillez entrer une adresse e-mail valide";
        }
        let passwordValue = event.target.querySelector("[name=password]").value
        if (passwordValue === "" && return_msg === "") { /* Cas du champ mot de passe vide */
            return_msg = "Veuillez entrer un mot de passe";
        }
        /* Ici on peut rajouter des conditions pour le mot de passe (taille minimum, caractères obligatoires...) */

        if (return_msg === "") { /* Si pas d'erreur de formulaire, on check le couple email/password */
            let reponseServer = await checkLogin(emailValue, passwordValue);
            if (reponseServer[0] === false){
                return_msg = reponseServer[1];
            } else {
                /*ici on a passé les étapes -> log in OK */
                errorField.innerHTML = "";
                errorField.style.backgroundColor = "#FFFEF8";
                window.localStorage.setItem("token",reponseServer[1]);
                location.replace("index.html");
            }
            
        }

        if (return_msg !== "") {
            errorField.innerHTML = return_msg;
            errorField.style.backgroundColor = "rgba(255,0,0,0.1)";
        }
        
    });
}

