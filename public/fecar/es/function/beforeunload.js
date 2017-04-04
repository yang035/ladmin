

window.addEventListener("beforeunload", function (e) {
	var confirmationMessage = "是否确认离开boss系统？";

	e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
	return confirmationMessage;              // Gecko, WebKit, Chrome <34
});
