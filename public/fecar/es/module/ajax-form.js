

// 异步上传表单，使用jquery form

const option = require("../config/option");


const selector = ".js-ajax-form";


$(selector).each(function(){
	$(this).ajaxForm(option.ajaxForm);
});
