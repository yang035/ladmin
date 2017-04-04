(function(){		
		let $eLreinspection = $('.js-order-reinspection');
		let $eLhidden = $('.js-order-hidden');
		let $eLnext = $('.js-next-time');
		let $eLchange = $('.js-change-choose');
		let $eLtime = $('.js-order-time');
		let $eLreset = $('.js-order-reset');
		
		//到店客违operate20  到店商违operate32 弹出弹窗的方法
		$eLreinspection.on('click',function(){      //弹出预约重检弹窗
			
            $.ajax({
				url: "http://127.0.0.1/boss/Public/fecar/js/order/test.json",
				type: "GET",
				dataType: "json",
				
			}).done( data => {
                if(data.status == 1){              	
                	reinspection();     //状态为1时弹出弹窗
                }


			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
                   
            
        });
       
	function reinspection(){
    	let urls = getUrl();
		let url = urls.reinspection;
        $.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				
			}).done( data => {
            
				layer.open({
					title: "",
					type: 1,
					content: data
				});


			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
    
    }
	  	
    
    //流标 operate10  商流operate12 客流operate13 商违operate17  弹出弹窗的方法
    $('.js-operate').on('click','input',function(){
    	
    	var index = $('.js-operate input').index($(this));
        if(index == 1){ //选中第2个时，下次跟进时间隐藏
            $($eLhidden).hide();
            $($eLtime).prop("disabled", true);
            $.ajax({
				url: "http://127.0.0.1/boss/Public/fecar/js/order/test.json",
				type: "GET",
				dataType: "json",
				
			}).done( data => {
                if(data.status == 1){              	
                	reinspection();     //状态为1时弹出弹窗
                }


			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
        }
        else{//当被选中的不是第2个时，下次跟进时间显示
            $($eLhidden).show();
            $($eLtime).prop("disabled", false);
        }
    })
    
    
    $($eLchange).css('display','none');
	$($eLreset).prop("disabled", true);
	
	 //operate 18  客违 弹出弹窗的方法
    $('.js-operate-action').on('click','input',function(){   
    	var index = $('.js-operate-action input').index($(this));
        if(index == 0){ //选中第1个时，下次跟进时间显示其余项隐藏
            $($eLchange).hide();
            $($eLnext).show();
            $($eLtime).prop("disabled", false);
        }
        else if(index == 1){//当被选中的不是第2个时，其余项显示下次跟进时间隐藏
            $($eLnext).hide();
            $($eLtime).prop("disabled", true);
            $($eLchange).show();
            $($eLreset).prop("disabled", false);
            $.ajax({
				url: "http://127.0.0.1/boss/Public/fecar/js/order/test.json",
				type: "GET",
				dataType: "json",
				
			}).done( data => {
                if(data.status == 1){              	
                	reinspection();     //状态为1时弹出弹窗
                }


			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
        }
        else{                    //否则都隐藏
        	$($eLchange).hide();
        	$($eLnext).hide();
        	$($eLreset).prop("disabled", true);
        	$($eLtime).prop("disabled", true);
        	$.ajax({
				url: "http://127.0.0.1/boss/Public/fecar/js/order/test.json",
				type: "GET",
				dataType: "json",
				
			}).done( data => {
                if(data.status == 1){              	
                	reinspection();     //状态为1时弹出弹窗
                }


			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
        }
    })
})();
    