

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
