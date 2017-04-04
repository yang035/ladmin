

(function(){
	let $form = $(".js-form");

	let $elPhone = $(".js-phone");
	let $elId = $(".js-id");
	let $elName = $(".js-name");
	let $elPrincipal = $(".js-principal");
	let $elNum = $(".js-num");
	let $elComment = $(".js-comment");

	$form.on("submit", function(){
		let data = {
			id: $elId.val(),
			phone: $elPhone.val(),
			name: $elName.val(),
			principal: $elPrincipal.val(),
			num: $elNum.val(),
			comment: $elComment.val()
		}
		let tpl = getTemplate(".jst-layer");

		layer.open({
			title: "充值信息确认",
			type: 1,
			content: template.compile(tpl)(data)
		});

		$(".js-btn-confirm").on("click", function(){
			$form.ajaxSubmit(option.ajaxForm);
		});

		return false;
	});
})();
