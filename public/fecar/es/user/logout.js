

const selector = ".js-user-logout";

let $selector = $(selector);

$selector.on("click", (event) => {
	event.preventDefault();

	layer.confirm(
		"是否确认退出？",
		index => {

		let href = $selector.prop("href");

		// $.ajax({
		// 	url: urls.userLogout,
		// 	type: "POST",
		// 	dataType: "json",
		// 	data: {
		// 		type: "logout"
		// 	}
		// });

		window.location.href = href;

		layer.close(index);
	});

});
