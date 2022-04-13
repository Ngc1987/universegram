module.exports = (err) => {
	let errors = { format: "", maxSize: ""};

	if (err.message.includes("Invalid file.")) {
		errors.format = "Format incompatible (formats acceptés: jpg, jpeg, png).";
	}
	if (err.message.includes("File is too large.")) {
		errors.maxSize = "Veuillez choisir un fichier de 500 Ko maximum.";
	}

	return errors
}