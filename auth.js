// Définition des configurations pour chaque espace
const authConfig = {
    mediation: {
        password: "1", // À remplacer par le vrai mot de passe
        storageKey: "authMediation",
        redirect: "Mediation.html"
    },
    diffusion: {
        password: "1", // À remplacer par le vrai mot de passe
        storageKey: "authDiffusion",
        redirect: "diffusion.html"
    },
    direction: {
        password: "1", // À remplacer par le vrai mot de passe
        storageKey: "authDirection",
        redirect: "direction.html"
    }
};

// Fonction pour vérifier les identifiants selon l'espace sélectionné
function verifier() {
    const passwordInput = document.getElementById("password").value;
    const space = document.getElementById("space").value;

    if (authConfig.hasOwnProperty(space)) {
        const config = authConfig[space];

        // Vérification du mot de passe
        if (passwordInput === config.password) {
            // Stockage du mot de passe encodé en base64 dans le localStorage
            localStorage.setItem(config.storageKey, btoa(passwordInput));
            // Redirection vers la page dédiée à l'espace
            window.location.href = config.redirect;
        } else {
            alert("Mot de passe incorrect pour l'espace " + space + " !");
        }
    } else {
        alert("Espace inconnu.");
    }
}

// Optionnel : fonction pour vérifier l'accès (à appeler dans les pages protégées)
function checkAccess(space) {
    if (authConfig.hasOwnProperty(space)) {
        const config = authConfig[space];
        // Vérifie si le mot de passe stocké correspond au mot de passe attendu (encodé en base64)
        if (localStorage.getItem(config.storageKey) !== btoa(config.password)) {
            window.location.href = "login.html";
        }
    }
}

// Fonction de déconnexion générique pour supprimer l'authentification d'un espace donné
function deconnexion(space) {
    if (authConfig.hasOwnProperty(space)) {
        localStorage.removeItem(authConfig[space].storageKey);
        window.location.href = "login.html";
    }
}
