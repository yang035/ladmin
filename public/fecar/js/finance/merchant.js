

(function(){
    let $body = $("body");

    $body.on("click", ".js-done", function(){
        let id = $(this).data("id");
        let urls = getUrl();
        let url = urls.done;
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: {
                    id: id
                }
			}).done( (data) => {
				if(data.status == 1){
					layer.open({
                        content: "确认到款后状态不可更改！请确认是否收到车商："+"<div class='bold c-danger' style='display:inline;'>"+data.car_dealer+"</div>" +"支付的购车款项：￥"+"<div class='bold c-danger' style='display:inline;'>"+data.payment+"</div>"+"元？"
                        ,btn: ['确认到款', '取消']
                        ,yes: function(index, layero){
                        	//执行ajax
                        	demand();
                        },btn2: function(index, layero){
                        	
                        	layer.closeAll();
                          
                        },cancel: function(){
                         //右上角关闭回调
                        }
                    });
				}else{
					layer.msg(data.msg, option.msgFailed);
				}

			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});

    });

})();
   function demand() { 	
        let urls = getUrl();
        let url = urls.done;
        $.ajax({
				url: url,
				type: "POST",
				dataType: "json",
				data: {}			
		}).done( data => {
				if(data.status == 1){   
					
                    layer.msg("确认成功", window.option.msgSuccess); 
                   
                } 
			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
        
	}