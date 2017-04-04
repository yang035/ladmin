

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
