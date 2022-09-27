export default function purifyPrice(price) {
	let purifiedPrice = "";
	if (price) {
		purifiedPrice = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	} else {
		purifiedPrice = "0";
	}

	return purifiedPrice;
}