module.exports = (err) => {
	let errors = {pseudo: "", email: "", password: ""};

	if(err.message.includes("pseudo")) {
		errors.pseudo = "Votre pseudo doit contenir entre 3 et 20 caractères.";
	}
	if(err.message.includes("email")) {
		errors.email = "Email incorrect.";
	}
	if(err.message.includes("password")) {
		errors.password = "Le mot de passe doit faire 6 caractères minimum.";
	}
	if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
		errors.email = "Cet email est déjà enregistré.";
	}
	if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
		errors.pseudo = "Ce pseudo est déjà utilisé, veuillez en choisir un autre.";
	}

	return errors
}