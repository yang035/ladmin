

const getFn = require("../scripttag");

const selector = {
	msgTemplate: ".jst-message",
	msgListener: ".jsl-message",
	msgBtn: ".js-btn-message",
	msgItem: ".m-message-item",
	msgPop: ".m-message-pop",
	msgPopNum: ".js-num",
	msgPopClose: ".close",
	sider: ".control-sidebar",
	siderOpen: "control-sidebar-open"
}

let $lsMessage = $(selector.msgListener);
let $btnMessage = $(selector.msgBtn);
let $popMessage = $(selector.msgPop);
let $popMessageNum = $popMessage.find(selector.msgPopNum);
let $popMessageClose = $popMessage.find(selector.msgPopClose);

let tpl = getFn.getTemplate(selector.msgTemplate);
let urls = getFn.getUrl();

let c = template.compile(tpl);
function render(html){
	$lsMessage.html(html);
}


let sider = {
	isOpen: false,
	$el: $(selector.sider),
	show () {
		this.$el.addClass(selector.siderOpen);
		this.isOpen = true;
	},
	hide () {
		this.$el.removeClass(selector.siderOpen);
		this.isOpen = false;
	}
}

$btnMessage.on("click", function(event){
	event.stopPropagation();
	if(sider.isOpen){
		sider.hide();
	}else{
		sider.show();

		$.ajax({
			url: urls.getMsg,
			type: "GET",
			dataType: "json"
		}).done( data => {
			try {
				render(c(data));
			}catch(e){}
		}).fail( () => {
			layer.msg("请求服务器失败", window.option.msgFailed);
		});


	}
});


$lsMessage.on("click", selector.msgItem + ".active", function(){
	let $this = $(this);
	let id = $this.data("id");
	let type = $this.data("type");

	$.ajax({
		url: urls.postMsgStatus,
		type: "POST",
		dataType: "json",
		data: {
			id,
			type
		}
	});

	$this.removeClass("active");
});


let timerPop = 0;

$popMessage.on("click", function(){
	$btnMessage.trigger("click");
	$popMessage.removeClass("active");
	clearTimeout(timerPop);
});

$popMessageClose.on("click", function(){
	$popMessage.removeClass("active");
	clearTimeout(timerPop);
	return false;
});

function popMessage(){
	$popMessage.addClass("active");
	timerPop = setTimeout(function(){
		$popMessage.removeClass("active");
	}, 30 * 1000);
}


const pollDelay = 1 * 60 * 1000;

let pollFn = throttle(function(){
	$.ajax({
		url: urls.poll,
		type: "GET",
		dataType: "text"
	}).done( data => {
		if(data > 0){
			$popMessageNum.text(data)
			popMessage();
		}
	}).always( () => {
		pollFn();
	});
}, pollDelay);

pollFn();


function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : (+ new Date());
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = (+ new Date());
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};
