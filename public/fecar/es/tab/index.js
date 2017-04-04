

let frameOption = {
	width: "100%",
	height: "100%",
	frameBorder: "0"
}

function createFrame(src){
	let f = document.createElement("iframe");

	f.src = src;

	$.extend(f, frameOption);

	return f;
}

module.exports = createFrame;
