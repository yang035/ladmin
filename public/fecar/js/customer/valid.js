
(function(){

	let $btn = $(".js-btn-allot");
	let $table = $(".js-main-table");
	let urls = getUrl();

	$btn.on("click", function(){
		let $checkbox = $table.find("td :checked");
		let arr = [];

		$checkbox.each(function(){
			arr.push( $(this).val() );
		});

		if( arr.length < 1 ){
			layer.msg("请选择一条记录", option.msgWarn);
			return;
		}

		$.ajax({
			url: urls.allot,
			type: "GET",
			dataType: "html",
			data: {
				ids: arr
			}
		}).done( data => {
			layer.open({
				title: "分配",
				type: 1,
				content: data
			});

			$(".js-layer-form").ajaxForm(option.ajaxForm);

		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});
	});

})()
