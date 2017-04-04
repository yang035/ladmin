

(function(){
	let $elAdd = $(".js-add");
	let $elModify = $(".js-modify");
	let $elDel = $(".js-del");
	let $elBranch = $(".js-branch");

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
				id: id
			}
		}).done( (data) => {

			layer.open({
				title: "岗位新增",
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
			layer.msg("请选择一个岗位", option.msgWarn);
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
			}).done( (data) => {
				layer.open({
					title: "岗位编辑",
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


	$elDel.on("click",  () => {
		let $tr = $tbody.find(trAcitveSelector);

		if($tr.length === 0){
			layer.msg("请选择岗位", option.msgWarn);
		}else{
			let arr =[];
			let url = urls.delete;

			$tr.each( function(){
				arr.push($(this).data("id"));
			});

			layer.confirm(
				"是否确认删除该岗位？",
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
						layer.msg(data.msg, option.msgSuccess,  () => {
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

		function render(roleId){
			let id = $(".js-post-id").data("id");
			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id: id,
					role_id: roleId
				}
			}).done( (data) => {
				$elPermissionList.html(data);

				$(".js-bonsai-checkbox").find(">ol").bonsai(option.bonsaiCheckbox);

			}).fail( () => {
				layer.msg("获取权限列表失败", option.msgFailed);

			});
		}

		$lsPermission.on("change", function(){
			let roleId = $(this).val();

			render(roleId);
		});

		render($lsPermission.val());


		let $form = $(".js-bonsai-checkbox-form");

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


	$elBranch.on("click", () => {
		let $tr = $tbody.find(trAcitveSelector);

		if($tr.length !== 1){
			layer.msg("请选择一个岗位", option.msgWarn);
		}else{
			let id = $tr.data("id");
			let url = urls.branchPermission;

			$.ajax({
				url,
				type: "GET",
				dataType: "html",
				data: {
					id
				}
			}).done( (data) => {

				layer.open({
					title: "岗位编辑",
					type: 1,
					offset: "100px",
					content: data
				});

				let $bonsai = $(".js-layer-bonsai");
				let $bonsaiCheckbox = $(".js-layer-bonsai-checkbox");

				let $btnEdit = $(".js-branch-btn-edit");
				let $btnSave = $(".js-branch-btn-save");

				$bonsai.find(">ol").bonsai(option.bonsai);
				$bonsaiCheckbox.find(">ol").bonsai(option.bonsaiCheckbox);

				let $list = $(".js-branch-bonsai");

				$btnEdit.on("click", function(){
					$btnEdit.hide();
					$btnSave.show();

					$bonsai.hide();
					$bonsaiCheckbox.show();

					let $form = $(".js-layer-form");

					$form.ajaxForm( option.ajaxForm );
				});

			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
		}
	});

})();
