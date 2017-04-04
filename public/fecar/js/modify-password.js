

(function(){
	const selector = ".js-form-mod";

	$form = $(selector);

	$form.ajaxForm({
		dataType: "json",
		beforeSubmit: arr => {
			console.dir(arr);
			if( arr[1].value !== arr[2].value ){
				layer.msg("输入的新密码不一致", window.option.msgFailed);

				return false;
			}
		},
		success: data => {
			if(data.status === 1){
				$form.resetForm();
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
		},
		error: () => {
			layer.msg("请求服务器失败", window.option.msgFailed);
		}
	});

})();
