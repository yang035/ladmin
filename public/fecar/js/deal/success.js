
(function(){

    let $eltable = $(".js-table");

    $eltable.on("click", ".js-finish", function(){
        let id = $(this).data("id");
        let urls = getUrl();
        let url = urls.finish;

        layer.confirm(
			"确定过户完成吗？",
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
