

let $body = $("body");
let selector = ".js-pic-pop";

$body.on("click", selector, function(event){
	let src = $(this).prop("src");

	if(src === undefined){
		src = $(this).find("img").prop("src");
	}

	if(src){
		let img = "<img width='100%' src='" + src + "'>"

		layer.open({
			title: false,
			area: ['1000px', '600px'],
			type: 1,
			shadeClose: true,
			content: img
		});
	}
});
