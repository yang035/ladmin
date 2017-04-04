

const option = require("../config/option");


const selector = ".js-ajax-form";


$(selector).each(function(){
	$(this).ajaxForm(option.ajaxForm);
});
