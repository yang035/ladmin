

(function(){
	let warn = {
		$el: $(".js-warn"),
		show (ct) {
			let text = ct || "";
			this.$el.text(text);
		},
		hide () {
			this.$el.text("");
		}
	}

	$(".js-form").ajaxForm({
		dataType: "json",
		beforeSerialize: () => {
			warn.hide();
		},
		success: data => {
			if(data.status === 1){
				location.href = data.url;
			}else{
				warn.show(data.info);
			}
		},
		error: () => {
			warn.show("请求服务器失败");
		}
	});

})();
