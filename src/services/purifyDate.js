export default function purifyDate(date) {
	let datePurified = "";
	if (date) {
		datePurified = new Date(date).toLocaleString("fa-IR");
	}
	return datePurified;
}
