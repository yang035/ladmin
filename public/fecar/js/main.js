(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


// 异步设置品牌选择

function initBrandChoose(){
	const selector = {
		lsAppend: ".jsl-brand",
		tpl: ".jst-brand",
		btnAdd: ".js-btn-brand",
		lsChoose: ".jsl-brand-choose",
		btnChoose: ".js-btn-brand-save"
	}

	let $lsAppend = $(selector.lsAppend);
	let $lsChoose = $(selector.lsChoose);
	let $btnChoose = $(selector.btnChoose);
	let $btnAdd = $(selector.btnAdd);

	let tpl = getTemplate(selector.tpl);

	$btnChoose.on("click", function(){
		html = "";

		$lsChoose.find("input:checked").each(function(){
			html += template.compile(tpl)(this);
		});

		$btnAdd.siblings().remove();
		$lsAppend.prepend(html);

		layer.close(window.indexLayer);
	});

	$lsAppend.find("input:checked").each(function(){
		var originDataName = $(this).data("name");
		
		$lsChoose.find("input").each(function(){
			if($(this).data("name") === originDataName){
				$(this).attr("checked", true);
			}
		});
	});

}


module.exports = initBrandChoose;

},{}],2:[function(require,module,exports){


// 异步设置需要确认提交的表单

const option = require("../config/option");


function initConfirmForm(selector, elContent){
	let form = selector || ".js-ajax-form-confirm";
	let $form = $(form);

	let $el = elContent || $form.find("[type='submit']");
	let text = $el.data("text") || "是否继续该操作？";

	$form.each(function(i){
		let $form = $(this);

		$form.on("submit", function(){
			layer.confirm(
				text,
				(index) => {

				$form.ajaxSubmit(option.ajaxForm);

				layer.close(index);
			});

			return false;
		});
	});
}


module.exports = initConfirmForm;

},{"../config/option":6}],3:[function(require,module,exports){


// 设置异步表单返回data的处理

function ajaxdata(data){
	if(data.status === 1){
		layer.closeAll();
		layer.msg(data.msg, window.option.msgSuccess);
		setTimeout( () => {
			$("form").resetForm();
		}, 1600 );
	}else{
		layer.msg(data.msg, window.option.msgFailed);
	}
	if(data.type === 1){
		setTimeout( () => {
			location.reload();
		}, 1500 );
	}else if(data.type === 2){
		setTimeout( () => {
			location.href = data.url;
		}, 1500 );
	}else if(data.type === 3){
		setTimeout( () => {
			try {
				window.top.closeTabNow();
			}catch(e){}
		}, 1500);
	}else if(data.type === 4){
		setTimeout( () => {
			try {
				window.top.closeTabNowAndFresh();
			}catch(e){}
		}, 1500);
	}else if(data.type === 5){
		setTimeout( () => {
			try {
				window.top.appendMainFrame(data.url);
				window.top.closeTab(location.href);
			}catch(e){}
		}, 1500);
	}
}


module.exports = ajaxdata;

},{}],4:[function(require,module,exports){


// 异步设置车商选择

function initMerchantChoose(){

	let $input = $(".js-merchant");
	let $inputId = $(".js-merchant-id");
	let $form = $(".js-merchant-form");

	$form.ajaxForm({
		dataType: "html",
		success: data => {
			layer.closeAll();
			layer.open({
				title: "选择车商",
				type: 1,
				content: data
			});
		},
		error: data => {
			layer.msg(data.msg, window.option.msgFailed);
		}
	});

	let $table = $(".js-merchant-select");
	let itemSelector = ".js-merchant-item";

	$table.on("click", itemSelector, function(){
		let $this = $(this);

		let name = $this.data("name");
		let id = $this.data("id");

		$input.val(name);
		$inputId.val(id);

		layer.closeAll();
	});

}


module.exports = initMerchantChoose;

},{}],5:[function(require,module,exports){


// 异步设置包含图片预览和上传的异步表单
// 同 ajax-form-file 和 pic-preview

function initPicForm(){

	const selector = {
		form : ".js-ajax-form-pic",
		del : ".del",
		moduleFile : ".m-file",
		add : ".js-add-pic",
		wrap : ".js-file-wrap",
		file : "input[type='file']",
		name : "p",
		img : "img",
		submit : "[type='submit']"
	}


	let $form = $(selector.form);

	$form.each(function(i){
		let $form = $(this);

		$form.on("click", selector.del, function(){
			let $this = $(this);

			$this.parents(selector.moduleFile).remove();
		});


		let $wrap = $form.find(selector.wrap);
		let $add = $form.find(selector.add);

		let tpl = getTemplate(".jst-pic-file");

		$add.on("click", function(){
			let $m = $(tpl);

			let $file = $m.find(selector.file);
			let $img = $m.find(selector.img);
			let $name = $m.find(selector.name);

			let reader = new FileReader();

			$file.on("change", function(event){
				let file = this.files[0];

				reader.addEventListener("load", function () {
					$img.prop("src", reader.result);
				});

				if(file){
					reader.readAsDataURL(file);
					$wrap.append($m);
				}

				$name.text(file.name);
			});

			$m.find(selector.file).trigger("click");
		});

		$form.on("submit", function(){
			let $this = $(this);
			let formData = new FormData($this.get(0));

			let $btn = $this.find(selector.submit);

			$.ajax({
				url: $this.prop("action"),
				type: "POST",
				data: formData,
				dataType: "json",
				async: false,
				cache: false,
				contentType: false,
				processData: false
			}).done( (data) => {
				window.method.ajaxdata(data);
			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);
			});

			return false;
		});
	});
}


module.exports = initPicForm;

},{}],6:[function(require,module,exports){


// https://github.com/Eonasdan/bootstrap-datetimepicker
let datetimepicker = {
	format: "YYYY-MM-DD HH:mm:ss",
	dayViewHeaderFormat: "YYYY-MM",
	sideBySide: true,
	locale: 'zh-cn'
}


let datetimenosecondpicker = {
	format: "YYYY-MM-DD HH:mm",
	dayViewHeaderFormat: "YYYY-MM",
	sideBySide: false,
	locale: 'zh-cn'
}


// https://github.com/uxsolutions/bootstrap-datepicker
let datepicker = {
	language: 'zh-CN',
	format: "yyyy-mm-dd",
	autoclose: true,
	todayHighlight: true,
	weekStart: 0
}

// https://github.com/jdewit/bootstrap-timepicker
let timepicker = {
	minuteStep: 15,
	showSeconds: true,
	secondStep: 15,
	showMeridian: false,
	defaultTime: false,
	defaultTime: "12:00:00"
}


// https://github.com/aexmachina/jquery-bonsai
let bonsai = {
	expandAll: true
}

let bonsaiRadio = {
	expandAll: true,
	createInputs: "radio"
}

let bonsaiCheckbox = {
	expandAll: true,
	createInputs: "checkbox",
	checkboxes: true
}


// https://github.com/malsup/form
let ajaxForm = {
	dataType: "json",
	success: data => {
		if(data.status === 1){
			$("button[type='submit']").prop("disabled", "true");
			
			layer.closeAll();
			layer.msg(data.msg, window.option.msgSuccess);
			setTimeout( () => {
				$(".js-ajax-form").resetForm();
			}, 1600 );
		}else{
			layer.msg(data.msg, window.option.msgFailed);
		}
		if(data.type === 1){
			setTimeout( () => {
				location.reload();
			}, 1500 );
		}else if(data.type === 2){
			setTimeout( () => {
				location.href = data.url;
			}, 1500 );
		}else if(data.type === 3){
			setTimeout( () => {
				try {
					window.top.closeTabNow();
				}catch(e){}
			}, 1500);
		}else if(data.type === 4){
			setTimeout( () => {
				try {
					window.top.closeTabNowAndFresh();
				}catch(e){}
			}, 1500);
		}else if(data.type === 5){
			setTimeout( () => {
				try {
					window.top.appendMainFrame(data.url);
					window.top.closeTab(location.href);
				}catch(e){}
			}, 1500);
		}
	},
	error: () => {
		layer.msg("请求服务器失败", window.option.msgFailed);
	},
	always: ()=> {
		$("button[type='submit']").prop("disabled", "false");
	}
}


// http://www.layui.com/doc/modules/layer.html
let msgDefault = {
	time: 1000
}

let msgSuccess = {
	time: 1500,
	icon: 1
}

let msgFailed = {
	time: 1500,
	icon: 2
}

let msgWarn = {
	time: 1500,
	icon: 7
}


let layerDefault = {
	maxWidth: 800,
	shift: 5
}

module.exports = {
	datetimepicker,
	datetimenosecondpicker,
	datepicker,
	timepicker,
	bonsai,
	bonsaiRadio,
	bonsaiCheckbox,
	ajaxForm,
	msgDefault,
	msgSuccess,
	msgFailed,
	msgWarn,
	layerDefault
}

},{}],7:[function(require,module,exports){


require("./window/scripttag");
require("./window/option");
require("./window/init-method");
require("./window/tab2main");
require("./window/leave2main");

require("./function/message");
require("./function/logout");
require("./function/default-click");
require("./function/beforeunload");

},{"./function/beforeunload":8,"./function/default-click":9,"./function/logout":11,"./function/message":12,"./window/init-method":14,"./window/leave2main":15,"./window/option":16,"./window/scripttag":17,"./window/tab2main":18}],8:[function(require,module,exports){


window.addEventListener("beforeunload", function (e) {
	var confirmationMessage = "是否确认离开boss系统？";

	e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
	return confirmationMessage;              // Gecko, WebKit, Chrome <34
});

},{}],9:[function(require,module,exports){


// 默认打开“首页”的tab

const selector = ".js-main-index";

$(selector).trigger("click");

},{}],10:[function(require,module,exports){


// 初始化登录表单为异步
// 点击“离开”按钮弹出登录表单
// exports出弹出表单的方法，并且此种弹出在登录成功时会触发window.refreshToInit（见logged-out.html）

const selector = ".js-user-leave";
const selectorLogin = ".js-user-leave-login";

let urls = getUrl();
let layerIndex = 0;
let $form = $(".js-layer-leave");

let tabNext = "";

$leave = $(selector);

$leave.on("click", (event) => {
	event.preventDefault();

	tabNow = "";
	tabNext = "";

	popLeave();

	let url = $leave.prop("href");

	$.ajax({
		url,
		type: "POST",
		dataType: "json"
	});
});


$form.ajaxForm({
	dataType: "json",
	success: data => {
		if(data.status === 1){
			layer.close(layerIndex);
			$form.resetForm();

			if(tabNext.length > 0){
				window.refreshToInit(tabNext);
			}
		}else{
			layer.msg(data.msg, window.option.msgFailed);
		}
	},
	error: () => {
		layer.msg("请求服务器失败", window.option.msgFailed);
	}
});


function popLeave(){
	layerIndex = layer.open({
		title: false,
		closeBtn: 0,
		shade: [1, "#c8c8c8"],
		type: 1,
		content: $form
	});
}

module.exports = function(next){
	tabNext = next;

	popLeave();
};

},{}],11:[function(require,module,exports){


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

},{}],12:[function(require,module,exports){


// 1、切换右侧信息列表
// 2、打开信息列表时请求服务器
// 3、点击信息，去除未读并告知服务器
// 4、轮询服务器，消息弹窗

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

let tpl = getTemplate(selector.msgTemplate);
let urls = getUrl();

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

},{}],13:[function(require,module,exports){


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

},{}],14:[function(require,module,exports){


// 异步设置的方法放在window中，一般为layer异步加载的html中调用

const initPicForm = require("../async-method/pic-form");
const initMerchantChoose = require("../async-method/merchant-choose");
const initConfirmForm = require("../async-method/confirm-form");
const initBrandChoose = require("../async-method/brand-choose");
const ajaxdata = require("../async-method/deal-ajax-data");


window.method = {
	initPicForm,
	initMerchantChoose,
	initConfirmForm,
	initBrandChoose,
	ajaxdata
}

},{"../async-method/brand-choose":1,"../async-method/confirm-form":2,"../async-method/deal-ajax-data":3,"../async-method/merchant-choose":4,"../async-method/pic-form":5}],15:[function(require,module,exports){


// 登录状态超时时调用的方法
// 登录成功时会触发window.refreshToInit（见../function/leave.js和页面中的logged-out.html）

const reLogin = require("../function/leave");


window.reLogin = reLogin;

},{"../function/leave":10}],16:[function(require,module,exports){


// option放至window中，以便异步或者非browserify编译的js使用

const option = require("../config/option");


window.option = option;

},{"../config/option":6}],17:[function(require,module,exports){


// 获取url和模版的方法

function getTemplate(selector){
	return $(selector).html();
}


const urlSelector = ".js-be-url";

function getUrl(){
	let o = {};
	let $url = $(urlSelector);

	$url.each(function(){
		let $this = $(this);

		try{
			$.extend(o, JSON.parse($this.text()) );
		}catch(e){ }

	});

	return o;
}


window.getTemplate = getTemplate;
window.getUrl = getUrl;

},{}],18:[function(require,module,exports){


// a[target="tab"]（appendMainFrame）为新增一个tab
// tab包括tab标签和对应的iframe子页面，保存在hash中，key为url
// 所有针对tab的操作均以src（url）为参数，而后在hash[src]中寻找对应tab和iframe进行处理
// 注意结尾放入window中的方法

const createFrame = require("../module/create-frame");

const scrollWidth = 120 * 3;
const tabWidth = 120;

const selector = {
	content: ".js-main-content",
	wrapTab: ".jsw-main-tab",
	listTab: ".jsl-main-tab",
	titleTab: ".js-title",
	closeTab: ".close",
	closeTabAll: ".js-tab-close",
	refreshTab: ".js-tab-refresh",
	prevTab: ".js-tab-prev",
	nextTab: ".js-tab-next"
}

let $elContent = $(selector.content);
let $wrapTab = $(selector.wrapTab);
let $listTab = $(selector.listTab);

let $btnFresh = $(selector.refreshTab);
let $prevTab = $(selector.prevTab);
let $nextTab = $(selector.nextTab);
let $btnCloseAll = $(selector.closeTabAll);

const listWidth = $listTab.width();
const scrollOffset = $listTab.position().left;

let hash = {};

function appendMainFrame(src){
    if( hash[src] ){
        showTab(src);
		switchTab(src);
        refreshTab(src);

        return;
    }

	let f = createFrame(src);
	let id = idGenerator();

	f.id = id;

	let $tab = appendTab(id);
    let $f = $(f);
    hash[src] = {$tab, $f};

	f.addEventListener("load", function(){
		let title = this.contentWindow.document.title;

		title = (title === "") ? "无标题" : title;

		$tab.prop("title", title);
		$tab.find(selector.titleTab).text(title);
		removeLoading(src);
	});

	$elContent.children("iframe").hide();
	$elContent.append(f);


	$tab.on("click", function(){
        showTab(src);
		switchTab(src);
	});

	$tab.find(selector.closeTab).on("click", function(event){
		event.preventDefault();

        closeTab(src);
	});

}


function showTab(src){
    hash[src].$f.show().siblings().hide();
    hash[src].$tab.addClass("active").siblings().removeClass("active");
}

function closeTab(src){
    hash[src].$f.remove();

    let $tab = hash[src].$tab;

    if($tab.hasClass("active")){
        let $prev = $tab.prev();
        if($prev.length > 0){
            $prev.trigger("click");
        }else{
            $tab.next().trigger("click");
        }
    }

    $tab.remove();
	delete hash[src];
}

function switchTab(src){
    let left = hash[src].$tab.position().left;
	let scrollLeft = $listTab.scrollLeft();

	if(left > listWidth - tabWidth){
		animateScroll(scrollLeft + left - (listWidth - tabWidth) - scrollOffset);
	}else if(left < scrollOffset){
		animateScroll(scrollLeft + left - scrollOffset);
	}
}

function refreshTab(src){
	addLoading(src);
    hash[src].$f.get(0).contentWindow.location.reload(true);
}

function refreshToInit(src){
	addLoading(src);
    hash[src].$f.get(0).contentWindow.location.href = src;
}

function animateScroll(left){
	$listTab.stop(true).animate({
		"scrollLeft": left + "px"
	}, 200);
}

function addLoading(src){
	hash[src].$tab.addClass("loading");
}

function removeLoading(src){
	hash[src].$tab.removeClass("loading");
}


$("body").on("click", 'a[target="tab"]', function(event){
	let src = $(this).prop("href");
	event.preventDefault();

    appendMainFrame(src);
});


$btnFresh.on("click", function(){
	let src = $elContent.children("iframe:visible").prop("src");

	refreshTab(src);
});

$btnCloseAll.on("click", function(){
	if(Object.keys(hash).length < 1){
		return;
	}

	layer.confirm(
		"是否关闭所有标签？",
		(index) => {

		for(let i in hash){
			if(hash.hasOwnProperty(i)){
				hash[i].$f.remove();
				hash[i].$tab.remove();
				delete hash[i];
			}
		}

		layer.close(index);
	});
});


$prevTab.on("click", function(){
	animateScroll($listTab.scrollLeft() - scrollWidth);
});

$nextTab.on("click", function(){
	animateScroll($listTab.scrollLeft() + scrollWidth);
});


function idGenerator(){
	return (new Date()).getTime();
}

function appendTab(id){
	let templateTab = getTemplate(".jst-main-tab");
	let o = {
		id,
	}
	let $tab = $(template.compile(templateTab)(o));

	$tab.addClass("active loading");

	let $tabActive = $listTab.children(".active");
	if($tabActive.length === 0){
		$listTab.append($tab);
	}else{
		$tabActive.after($tab);
	}
	$tab.siblings().removeClass("active");

	let left = $tab.position().left;
	let scrollLeft = $listTab.scrollLeft();

	if(left > listWidth - tabWidth){
		$listTab.scrollLeft(scrollLeft + left - (listWidth - tabWidth));
	}

	return $tab;
}


window.appendMainFrame = appendMainFrame;
window.closeTab = closeTab;
window.refreshToInit = refreshToInit;
window.closeTabNow = function(){
	$listTab.children(".active").find(selector.closeTab).trigger("click");
}
window.closeTabNowAndFresh = function(){
	$listTab.children(".active").find(selector.closeTab).trigger("click");
	setTimeout(() => {
		$btnFresh.trigger("click");
	}, 200);
}

},{"../module/create-frame":13}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxucmVxdWlyZShcIi4vd2luZG93L3NjcmlwdHRhZ1wiKTtcclxucmVxdWlyZShcIi4vd2luZG93L29wdGlvblwiKTtcclxucmVxdWlyZShcIi4vd2luZG93L2luaXQtbWV0aG9kXCIpO1xyXG5yZXF1aXJlKFwiLi93aW5kb3cvdGFiMm1haW5cIik7XHJcbnJlcXVpcmUoXCIuL3dpbmRvdy9sZWF2ZTJtYWluXCIpO1xyXG5cclxucmVxdWlyZShcIi4vZnVuY3Rpb24vbWVzc2FnZVwiKTtcclxucmVxdWlyZShcIi4vZnVuY3Rpb24vbG9nb3V0XCIpO1xyXG5yZXF1aXJlKFwiLi9mdW5jdGlvbi9kZWZhdWx0LWNsaWNrXCIpO1xyXG5yZXF1aXJlKFwiLi9mdW5jdGlvbi9iZWZvcmV1bmxvYWRcIik7XHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9
