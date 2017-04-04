

const selector = {
	body: "body"
}

let $body = $(selector.body);

$body.on("click", 'a[target="phone"]', function(e){
	let $this = $(this);
	let url = $this.prop("href");
	e.preventDefault();

	$.ajax({
		url: url,
		type: "GET",
		dataType: "json"
	}).done( (data) => {
		if(data.status === 1){
			layer.msg(data.msg, window.option.msgSuccess);
		}else{
			layer.msg(data.msg, window.option.msgFailed);
		}
	}).fail( () => {
		layer.msg("请求服务器失败", option.msgFailed);
	});

});
