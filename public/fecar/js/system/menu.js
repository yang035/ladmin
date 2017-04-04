

(function(){
	let $elAdd = $(".js-add");
	let $elModify = $(".js-modify");
	let $elDel = $(".js-del");

	let $tbody = $(".js-tr-single");
	let trAcitveSelector = ".info";

	let urls = getUrl();

	$elAdd.on("click", function(){
		let url = urls.add;
		let $tr = $tbody.find(trAcitveSelector);
		let id = 0;

		if($tr.length > 0){
			id = $tr.data("id");
		}

		$.ajax({
			url: url,
			type: "GET",
			dataType: "html",
			data: {
				id: id
			}
		}).done(function(data){
			layer.open({
				title: "菜单新增",
				btn: ["取消"],
				type: 1,
				content: data,
				yes: function(index){
					layer.close(index);
				}
			});

		}).fail(function(){
			layer.msg("请求服务器失败", option.msgFailed);

		});
	});

	$elModify.on("click", function(){
		let $tr = $tbody.find(trAcitveSelector);

		if($tr.length !== 1){
			layer.msg("请选择一个", option.msgWarn);
		}else{
			let id = $tr.data("id");
			let url = urls.modify;

			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id: id
				}
			}).done(function(data){
				layer.open({
					title: "菜单编辑",
					btn: ["取消"],
					type: 1,
					content: data,
					yes: function(index){
						layer.close(index);
					}
				});

			}).fail(function(){
				layer.msg("请求服务器失败", option.msgFailed);

			});
		}
	});

	$elDel.on("click", function(){
		let $tr = $tbody.find(trAcitveSelector);

		if($tr.length === 0){
			layer.msg("请选择一个", option.msgWarn);
		}else{
			let url = urls.delete;
			layer.confirm(
				"您确定要删除？",
				function(index) {
					$.getJSON(url, { id : $tr.data("id") }).done(function(data){
						if(data.status === 1){
							layer.msg(data.msg, option.msgSuccess, function() {
								location.reload()
							});
						}else{
							layer.msg(data.msg, option.msgFailed);
						}

					}).fail(function(){
						layer.msg("请求服务器失败", option.msgFailed);

					});

					layer.close(index);
				}
			);
		}

	});

})();
