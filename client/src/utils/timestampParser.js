export const timestampParser = (timestamp) => {
	let options = {
		year: "numeric", 
		month: "short", 
		weekday: "long", 
		day: "numeric", 
		hour: "2-digit", 
		minute: "2-digit", 
		second: "2-digit" 
	};

	let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

	return date.toString();

}