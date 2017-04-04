

// iframe子页面中打开tab的方法

const createFrame = require("../module/create-frame");

let appendMainFrame = window.top.appendMainFrame;


$("body").on("click", 'a[target="tab"]', function(event){
	let src = $(this).prop("href");
	event.preventDefault();

	appendMainFrame(src);
});
