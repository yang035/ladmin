

// 初始化登录表单为异步
// 点击“离开”按钮弹出登录表单
// exports出弹出表单的方法，并且此种弹出在登录成功时会触发window.refreshToInit（见logged-out.html）

const selector = ".js-user-leave";
const selectorLogin = ".js-user-leave-login";

let urls = getUrl();
let layerIndex = 0;
let $form = $(".js-layer-leave");

let tabNext = "";

$leave = $(selector);

$leave.on("click", (event) => {
	event.preventDefault();

	tabNow = "";
	tabNext = "";

	popLeave();

	let url = $leave.prop("href");

	$.ajax({
		url,
		type: "POST",
		dataType: "json"
	});
});


$form.ajaxForm({
	dataType: "json",
	success: data => {
		if(data.status === 1){
			layer.close(layerIndex);
			$form.resetForm();

			if(tabNext.length > 0){
				window.refreshToInit(tabNext);
			}
		}else{
			layer.msg(data.msg, window.option.msgFailed);
		}
	},
	error: () => {
		layer.msg("请求服务器失败", window.option.msgFailed);
	}
});


function popLeave(){
	layerIndex = layer.open({
		title: false,
		closeBtn: 0,
		shade: [1, "#c8c8c8"],
		type: 1,
		content: $form
	});
}

module.exports = function(next){
	tabNext = next;

	popLeave();
};
