(function(){

    let $elshow = $(".js-showout");
    let $elhidden = $(".js-hiddenout");
    let $eldemand = $(".js-ajax-demand");
    let $table = $('.table');
    let urls = getUrl();
    
    $elshow.on("click", () => {		
			let url = urls.show;
			let id = $(this).data("id");
			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id
				}
			}).done( data => {

				layer.open({
					title: "",
					type: 1,
					content: data
				});


			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
	});
	
	$elhidden.on("click", () => {		
			let url = urls.hidden;
			let id = $(this).data("id");
			$.ajax({
				url: url,
				type: "GET",
				dataType: "html",
				data: {
					id
				}
			}).done( data => {

				layer.open({
					title: "",
					type: 1,
					content: data
				});


			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
	});
	
	$eldemand.on("click", () => {	
			let url = urls.demand;
			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				data: {
					
				}
			}).done( data => {
				var result = data.msg;
				if(data.status == 1){                                   
				    layer.msg(result,window.option.msgSuccess);
                }else{
                	layer.msg(result,option.msgFailed);
                }
			}).fail( () => {
				layer.msg("请求服务器失败", option.msgFailed);

			});
	});
	
})();