
(function(){

    let $eltable = $(".js-before-table");

    $eltable.on("click", ".js-soldout", function(){
        let id = $(this).data("id");
        let urls = getUrl();
        let url = urls.delete;

        layer.confirm(
			"确定要下架该车辆吗？",
			(index) => {

            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    id: id
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
