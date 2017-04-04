

// （订单处理中切换右侧备注信息和操作记录）

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
