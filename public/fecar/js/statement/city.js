   
    var urls = getUrl();
    var url_form = urls.form;  //引入报表接口
    var time = $('.time');
    var top_channel = $('.top_channel');
    var mid_channel = $('.mid_channel');
    var last_channel = $('.last_channel');
    var city_id = $('.city_id');

$(function(){
    //页面打开后获取全部数据曲线图	
    var data = ['新增','优质'];
        $.ajax({
        type: "post",          
        url: url_form,    
        data: 
        {"date": time.val(),
         "top_channel": top_channel.val(),
         "mid_channel": top_channel.val(),
         "last_channel": last_channel.val(),
         "city_id": city_id.val()
        },  
        traditional: true,       //这里设置为true
        dataType: "json",        //返回数据形式为json
        success: function(result) {          	
             //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result.status == 1) {
            	var html = template('table', result);   //加入表格数据
                document.getElementById('content').innerHTML = html;
                
            	var list = result.city;      //时间段数组（实际用来盛放x坐标值）
                var myChart = echarts.init(document.getElementById('chart')); //加入报表表据

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
                        type: 'bar',
                        data: result.chart[i].today,
                        barGap: '5%',
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
		
})

 //查询数据 
function PostData() { 

    var data = ['新增','优质'];
        $.ajax({
        type : "post",          
        url : url_form,    
        data : 
        {"date": time.val(),
         "top_channel": top_channel.val(),
         "mid_channel": mid_channel.val(),
         "last_channel": last_channel.val(),
         "city_id": city_id.val()
        },             //把当前的数据传递给后台
  
        dataType : "json",        //返回数据形式为json
        success : function(result) {          	
             //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result.status == 1) {
            	var html = template('table', result);   //加入表格数据
                document.getElementById('content').innerHTML = html;
                
            	var list = result.city;      //时间段数组（实际用来盛放x坐标值）
                var myChart = echarts.init(document.getElementById('chart')); //加入报表表据

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
                        type: 'bar',
                        data: result.chart[i].today,
                        barGap: '5%',
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
    
       		return false;
       		
}