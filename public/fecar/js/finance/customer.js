(function(){
    let $body = $("body");

    $body.on("click", ".js-done", function(){
        let id = $(this).data("id");
        let urls = getUrl();
        let url = urls.done;

        layer.confirm(
			"请先确认车商支付的款项是否到账!是否前往确认?",
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
					
			        location.href = "merchant.html";		
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