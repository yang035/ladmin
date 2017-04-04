

// 选择 a[target="layer"]，使用layer弹出
// 并处理title和尝试初始化异步表单、日期选择插件

const selector = {
	body: "body",
	form: ".js-ajax-form-layer",
	datepicker: ".js-date-picker"
}

let $body = $(selector.body);

$body.on("click", 'a[target="layer"]', function(e){
	let $this = $(this);
	let url = $this.prop("href");
	let title = $this.data("title");
	e.preventDefault();

	$.ajax({
		url: url,
		type: "GET",
		dataType: "html"
	}).done( (data) => {
		let $title = $(data).filter(".js-title");

		if($title.length > 0 && title === undefined){
			title = $title.text();
		}

		window.indexLayer = layer.open({
			title: title || "更多信息",
			type: 1,
			content: data
		});

		let $form = $(selector.form);

		try {
			$form.ajaxForm(option.ajaxForm);
		}catch(e){}

		try {
			$form.find(selector.datepicker).datepicker(option.datepicker);
		}catch(e){}

	}).fail( () => {
		layer.msg("请求服务器失败", option.msgFailed);
	});

});
