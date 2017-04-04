

(function(){
	const selector = {
		body: "body",
		invalid: ".js-btn-invalid"
	}

	let $body = $(selector.body);

	let urls = getUrl();


	$body.on("click", selector.invalid, function(event){
		let $this = $(this);
		let id = $this.data("id");

		layer.confirm(
			"是否确认将该车商确认为无效车商？",
			(index) => {

			$.ajax({
				url: urls.invalid,
				type: "POST",
				dataType: "json",
				data: {
					id
				}
			}).done( (data) => {
				if(data.status === 1){
					layer.msg(data.msg, option.msgSuccess, () => {
						location.reload()
					});
				}else{
					layer.msg(data.msg, option.msgFailed);
				}

			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});

			layer.close(index);
		});
	});

})();
