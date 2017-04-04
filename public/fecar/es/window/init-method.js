

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
