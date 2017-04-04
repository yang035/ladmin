
(function(){

    $("body").on("click", ".js-pass", function(){
        let id = $(this).data("id");
        let urls = getUrl();
        let url = urls.pass;

        layer.confirm(
			"确定复检通过吗？",
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
    });
})();
