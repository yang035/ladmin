

const selector = ".js-user-leave";
const selectorLogin = ".js-user-leave-login";

let urls = getUrl();
let layerIndex = 0;
let $form = $(".js-layer-leave");

$leave = $(selector);

$leave.on("click", (event) => {
	event.preventDefault();

	popLeave();

	let url = $leave.prop("href");

	$.ajax({
		url,
		type: "POST",
		dataType: "json"
	});
});


function popLeave(){
	index = layer.open({
		title: false,
		closeBtn: 0,
		shade: [1, "#c8c8c8"],
		type: 1,
		content: $form
	});
}


$form.ajaxForm({
	dataType: "json",
	success: data => {
		if(data.status === 1){
			layer.close(index);
			$form.resetForm();
		}else{
			layer.msg(data.msg, window.option.msgFailed);
		}
	},
	error: () => {
		layer.msg("请求服务器失败", window.option.msgFailed);
	}
});
