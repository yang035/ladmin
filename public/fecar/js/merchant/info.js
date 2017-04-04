

(function(){
	const selector = {
		body: "body",
		unfreeze: ".js-btn-unfreeze",
		audit: ".js-btn-audit"
	}

	let $body = $(selector.body);

	let urls = getUrl();


	$body.on("click", selector.audit, function(event){
		let $this = $(this);
		let id = $this.data("id");

		layer.confirm(
			"是否确认提交审核？",
			(index) => {

			$.ajax({
				url: urls.audit,
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

	$body.on("click", selector.unfreeze, function(event){
		let $this = $(this);
		let id = $this.data("id");

		layer.confirm(
			"解冻后，该账户可正常参与车辆竞拍，是否确认解冻该账号？",
			(index) => {

			$.ajax({
				url: urls.unfreeze,
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
