

(function(){
	let $elAdd = $(".js-add");
	let $elModify = $(".js-modify");
	let $elDel = $(".js-del");
	let $elForget = $(".js-forget");
	let $elLeave = $(".js-leave")

	let $tbody = $(".js-tr-single");
	let trAcitveSelector = ".info";

	let urls = getUrl();


	$elAdd.on("click", () => {
		let $tr = $tbody.find(trAcitveSelector);
		let url = urls.add;
		let id = ($tr.data("id") === undefined) ? "" : $tr.data("id");

		$.ajax({
			url: url,
			type: "GET",
			dataType: "html",
			data: {
				id
			}
		}).done( data => {

			layer.open({
				title: "检测师新增",
				type: 1,
				content: data
			});

			initForm();

		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});
	});

	$elModify.on("click", () => {
		let $tr = $tbody.find(trAcitveSelector);

		if($tr.length !== 1){
			layer.msg("请选择一个检测师", option.msgWarn);
		}else{
			let id = $tr.data("id");
			let url = urls.modify;

			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id
				}
			}).done( data => {
				layer.open({
					title: "检测师编辑",
					type: 1,
					content: data
				});

				initForm();

			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
		}
	});
	
	$elLeave.on("click", () => {
		let $tr = $tbody.find(trAcitveSelector);
		

		if($tr.length !== 1){
			layer.msg("请选择一个检测师", option.msgWarn);
		}else{
			let url = urls.leave;
			let id = $tr.data("id");
			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id
				}
			}).done( data => {

				layer.open({
					title: "请假",
					type: 1,
					content: data
				});

				initForm();

			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
		}
	});

	$elDel.on("click", () => {
		let $tr = $tbody.find(trAcitveSelector);

		if($tr.length === 0){
			layer.msg("请选择检测师", option.msgWarn);
		}else{
			let arr =[];
			let url = urls.delete;

			$tr.each(function(){
				arr.push($(this).data("id"));
			});

			layer.confirm(
				"删除后不可恢复，是否确认删除该检测师账号？",
				(index) => {

				$.ajax({
					url: url,
					type: "POST",
					dataType: "json",
					data: {
						ids: arr
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
		}

	});


	function initForm(){
		$(".js-datetime-picker").datetimepicker(option.datetimenosecondpicker);
		let $form = $(".js-layer-form");

		$form.ajaxForm(option.ajaxForm);
	}


	$elForget.on("click", () => {
		let $tr = $tbody.find(trAcitveSelector);

		if($tr.length !== 1){
			layer.msg("请选择一个检测师", option.msgWarn);
		}else{
			let id = $tr.data("id");
			let url = urls.forget;

			layer.confirm(
				"是否将该检测师的密码重置为初始密码？",
				(index) => {

				$.ajax({
					url: url,
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
		}

	});

})();
