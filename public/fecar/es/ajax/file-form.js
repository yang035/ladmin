

const selector = {
	form : ".js-ajax-form-file"
}

let $form = $(selector.form);

$form.each(function(i){
	let $form = $(this);

	$form.on("submit", function(){
		let $this = $(this);
		let formData = new FormData($this.get(0));

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
