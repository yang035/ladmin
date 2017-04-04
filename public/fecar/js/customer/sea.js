
(function(){

	let $btnAllot = $(".js-btn-allot");
	let $btnPut = $(".js-btn-put");

	let $table = $(".js-main-table");
	let urls = getUrl();

	$btnAllot.on("click", function(){
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
				title: "选择卖车顾问",
				type: 1,
				content: data
			});

			$(".js-layer-form").ajaxForm(option.ajaxForm);

		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});
	});

	$btnPut.on("click", function(){
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
			url: urls.put,
			type: "POST",
			dataType: "json",
			data: {
				ids: arr
			}
		}).done( data => {
			if(data.status === 1){
				layer.closeAll();
				layer.msg(data.msg, window.option.msgSuccess);
			}else{
				layer.msg(data.msg, window.option.msgFailed);
			}
			if(data.type === 1){
				setTimeout( () => {
					location.reload();
				}, 1500 );
			}else if(data.type === 2){
				location.href = data.url;
			}

		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});
	});

})()
