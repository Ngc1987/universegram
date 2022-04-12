module.exports = (err) => {
	let errors = { email: "", password: "" };

	if (err.message.includes("email")) {
		errors.email = "Email inconnu.";
	}
	if (err.message.includes("password")) {
		errors.password = "Le mot de passe ne correspond pas.";
	}

	return errors
}