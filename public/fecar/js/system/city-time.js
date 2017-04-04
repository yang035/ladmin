

(function(){
	let $elAdd = $(".js-add");
	let $elModify = $(".js-modify");
	let $elDel = $(".js-del");

	let $tbody = $(".js-tr-single");
	let trAcitveSelector = ".info";

	let urls = getUrl();


	$elAdd.on("click", () => {
		let url = urls.add;
		let cityId = urls.cityId;

		$.ajax({
			url: url,
			type: "GET",
			dataType: "html",
			data: {
				city_id: cityId
			}
		}).done( data => {

			layer.open({
				title: "时间段新增",
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
			layer.msg("请选择一个时间段", option.msgWarn);
		}else{
            let id = $tr.data("id");
            let start = $tr.data("start");
			let end = $tr.data("end");
			let url = urls.modify;
			let cityId = urls.cityId;

			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id,
                    start,
                    end,
					city_id: cityId
				}
			}).done( data => {
				layer.open({
					title: "时间段编辑",
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
			layer.msg("请选择时间段", option.msgWarn);
		}else{
			let arr =[];
			let url = urls.delete;
			let cityId = urls.cityId;

			$tr.each(function(){
				let $this = $(this);
				arr.push({
                    id: $this.data("id"),
                    start: $this.data("start"),
                    end: $this.data("end")
                });
			});

			layer.confirm(
				"是否确认删除该时间段？",
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

		$(".js-time-picker").timepicker(option.timepicker);
	}

})();
