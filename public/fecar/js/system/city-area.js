


(function(){
	let $elAdd = $(".js-add");
	let $elModify = $(".js-modify");
	let $elDel = $(".js-del");

	let $tbody = $(".js-tr-single");
	let trAcitveSelector = ".info";

	let urls = getUrl();


	$elAdd.on("click", () => {
		let $tr = $tbody.find(trAcitveSelector);
		let url = urls.add;
		let id = ($tr.data("id") === undefined) ? "" : $tr.data("id");
        let cityId = urls.cityId;

		$.ajax({
			url: url,
			type: "GET",
			dataType: "html",
			data: {
				id,
                city_id: cityId
			}
		}).done( data => {

			layer.open({
				title: "区域新增",
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
			layer.msg("请选择一个区域", option.msgWarn);
		}else{
			let id = $tr.data("id");
			let url = urls.modify;
            let cityId = urls.cityId;

			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id,
                    city_id: cityId
				}
			}).done( data => {
				layer.open({
					title: "区域编辑",
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
			layer.msg("请选择区域", option.msgWarn);
		}else{
			let arr =[];
			let url = urls.delete;
            let cityId = urls.cityId;

			$tr.each(function(){
				arr.push($(this).data("id"));
			});

			layer.confirm(
				"是否确认删除该区域？",
				(index) => {

				$.ajax({
					url: url,
					type: "POST",
					dataType: "json",
					data: {
						ids: arr,
                        city_id: cityId
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
		let $form = $(".js-layer-form");

		$form.ajaxForm(option.ajaxForm);
	}

})();
