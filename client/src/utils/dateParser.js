export const dateParser = (date) => {
	let options = {year: "numeric",month: "short", weekday: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"};

	let timestamp = Date.parse(date);

	let newDate = new Date(timestamp).toLocaleDateString("fr-FR", options);

	return newDate.toString();
}