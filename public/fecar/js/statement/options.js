
    var urls = getUrl();
    var url_form = urls.form;  //引入曲线图借口
    var url_table = urls.table; //引入表格借口     
    var url_incearse = urls.incearse; //引入表格借口    
    
    function test(){
	//页面打开后获取环比数据
	$.ajax({
			url: url_incearse,
			type: "POST",
			dataType: "json",
			data: $(".refer").serialize()
		}).done( (data) => {
			if(data.status == 1){                    					
			    var html = template('comparative', data);
			    var txt;
                document.getElementById('increase').innerHTML = html;	
                
                $('.text').each(function(v){     //判断环比值添加样式
                	$txt = $(this).text();
                	$float = parseFloat($txt);
                	
                	if($float > 0 ) {
                		$(this).addClass('text-danger');
                	} else if($float < 0) {
                		$(this).addClass('text-success');
                	}                	
                	
                });
                
			}else{			
					layer.msg(data.msg, option.msgFailed);
				}
            
		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});	
	
 //页面打开后获取全部数据曲线图
    var data = ['新增','优质'];
        $.ajax({
        type : "post",
        async : false,            
        url : url_form,    
        data : $(".refer").serialize(),                       //把当前的数据传递给后台
        traditional: true,       //这里设置为true
        dataType : "json",        //返回数据形式为json
        success : function(result) {          	
             //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result.status == 1) {
            	var list = result.mouth;      //时间段数组（实际用来盛放x坐标值）
                var myChart = echarts.init(document.getElementById('chart'));

          	        myChart.setOption({
                        title: {
                             text: ''
                        },
                        tooltip: {},
                        legend: {
                            y: 'bottom',
                            data: data,
                            textStyle: {
                                color: '#555',
                                fontSize: 16
                               }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                             data: list
                        },
                        yAxis: {},
                        series: functionName(result)
                            
                });            
                 function functionName(result){      	
                    var serie = [];
                    for(var i = 0; i < result.chart.length; i++){  
                    	
                        var item = {
                        name: result.chart[i].name,
                        type: 'line',
                        data: result.chart[i].today,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]} 
                        }
                        serie.push(item);
                    };               
                    return serie;
                }                                                                       
                           
            }else{
            	
            	layer.msg(result.msg, option.msgFailed);
            }
         
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            layer.msg("请求服务器失败", option.msgFailed);
        }
        })	
       

        
	//页面打开后获取全部表格数据
	$.ajax({
			url: url_table,
			type: "POST",
			dataType: "json",
			data: $(".refer").serialize()
		}).done( (data) => {
			if(data.status == 1){                    					
					var html = template('table', data);
                    document.getElementById('content').innerHTML = html;					
			}else{			
					layer.msg(data.msg, option.msgFailed);
				}
            
		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});
		
}
    test();                    //调用test函数初始化数据
    setInterval(test,300000);  //5分钟刷新一次数据

 //查询数据 
	function PostData(){ 
    //页面打开后获取环比数据
	 
	$.ajax({
			url: url_incearse,
			type: "POST",
			dataType: "json",
			data: $(".refer").serialize()
		}).done( (data) => {
			if(data.status == 1){ 
				
			    var html = template('comparative', data);
			    var txt;
                document.getElementById('increase').innerHTML = html;	
                
                $('.text').each(function(v){     //判断环比值添加样式
                	$txt = $(this).text();
                	$float = parseFloat($txt);
                	
                	if($float > 0 ) {
                		$(this).addClass('text-danger');
                	} else if($float < 0) {
                		$(this).addClass('text-success');
                	}                	
                	
                });
               
			}else{			
					layer.msg(data.msg, option.msgFailed);
				}
            
		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});
		
    var data = ['新增','优质'];
        $.ajax({
        type: "post",
        async: false,            
        url: url_form,    
        data: $(".refer").serialize(),                         //把当前的数据传递给后台
        traditional: true,        //这里设置为true
        dataType: "json",        //返回数据形式为json
        success: function(result) {          	
             //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result.status == 1) {
            	var list = result.mouth;      //时间段数组（实际用来盛放x坐标值）
                var myChart = echarts.init(document.getElementById('chart'));

          	        myChart.setOption({
                        title: {
                             text: ''
                        },
                        tooltip: {},
                        legend: {
                            y: 'bottom',
                            data: data,
                            textStyle: {
                                color: '#555',
                                fontSize: 16
                               }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                             data: list
                        },
                        yAxis: {},
                        series: functionName(result)
                            
                });            
                function functionName(result){      	
                    var serie = [];
                    for(var i = 0; i < result.chart.length; i++){  
                    	
                        var item = {
                        name: result.chart[i].name,
                        type: 'line',
                        data: result.chart[i].today,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]} 
                        }
                        serie.push(item);
                    };               
                    return serie;
                }                                   
                                      
                                      
            }else{
            	
            	layer.msg(result.msg, option.msgFailed);
            }
         
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            layer.msg("请求服务器失败", option.msgFailed);
        }
        })	
    
    $.ajax({
			url: url_table,
			type: "POST",
			dataType: "json",
			data: $(".refer").serialize()
		}).done( (data) => {
			if(data.status == 1){                    					
					var html = template('table', data);
                    document.getElementById('content').innerHTML = html;					
			}else{			
					layer.msg(data.msg, option.msgFailed);
				}
            
		}).fail( () => {
			layer.msg("请求服务器失败", option.msgFailed);

		});
       		return false;
       		
  }
