

const selector = {
	el: ".js-aside-over",
	btn: ".js-btn",
	className: "active"
}


let $el = $(selector.el);
let $btn = $el.find(selector.btn);


$btn.on("click", function(){
	$el.toggleClass(selector.className);
});
