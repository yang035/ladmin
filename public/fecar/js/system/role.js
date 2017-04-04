

(function(){
	let $elAdd = $(".js-add");
	let $elModify = $(".js-modify");
	let $elDel = $(".js-del");
	let $elForget = $(".js-forget");

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
				title: "角色新增",
				type: 1,
				offset: "100px",
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
			layer.msg("请选择一个角色", option.msgWarn);
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
					title: "角色编辑",
					type: 1,
					offset: "100px",
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
			layer.msg("请选择角色", option.msgWarn);
		}else{
			let arr =[];
			let url = urls.delete;

			$tr.each(function(){
				arr.push($(this).data("id"));
			});

			layer.confirm(
				"删除角色，会删除该角色关联的所有岗位，是否确认删除该角色？",
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
		let $lsPermission = $(".jsl-permission");
		let $elPermissionList = $(".js-permission-list");
		let url = urls.permissionList;

		let $lsCopy = $(".jsl-copy");
		let $btnCopy = $(".js-btn-copy");
		let $btnCopyConfirm = $(".js-btn-copy-confirm");

		function render(id){
			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id
				}
			}).done( (data) => {
				$elPermissionList.html(data);

				$(".js-bonsai-checkbox").find(">ol").bonsai(option.bonsaiCheckbox);

			}).fail( () => {
				layer.msg("获取权限列表失败", option.msgFailed);

			});
		}

		$btnCopy.on("click", function(){
			$lsCopy.show();
		});

		$btnCopyConfirm.on("click", function(){
			let $input = $lsCopy.find(":checked");
			let val = $input.data("id");

			if(val === undefined){
				layer.msg("请选择角色进行拷贝", option.msgFailed);
			}else{
				render(val);
				$lsCopy.hide();
			}
		});

		render($(".js-post-id").data("id"));


		let $form = $(".js-layer-form");

		$form.ajaxForm( $.extend({
			beforeSerialize: () => {
				$form.find(":indeterminate").each( function(){
					if(this.indeterminate){
						this.checked = true;
					}
				});
			}
		}, option.ajaxForm) );
	}

})();
