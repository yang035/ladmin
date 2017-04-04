

$(function(){

    cityStoreCharts();

});


function cityStoreCharts(){

    var cityButtion = $(".js-city-button");
    var urls = getUrl();
    var detect_url = urls.detect;
    var store_url = urls.store;
    var wrap = $(".js-wrap");
    var html = "";
    var url = "";
    var myChart = echarts.init(document.getElementById('city-charts'));
    var navTabs = $(".js-nav-tabs li:first");
    var searchTime = $(".js-searchtime");
    var formEvaluate =  $(".js-form-evaluate");
    var startTime = $(".js-form-evaluate input[name=evaluate-start]");
    var endTime = $(".js-form-evaluate input[name=evaluate-end]");
    

    var option = {

        title: {},

        tooltip: {},

        legend: {
            data: []
        },

        color: ["#5cb85c"],

        xAxis: {
            type: 'category',
            data: []
        },

        yAxis: {},

        series: [
            {
                type: 'bar',
                barWidth: '40%',
                data: []
            }
        ]
    };

    myChart.setOption(option);

    if(navTabs.hasClass('active')){
        url = detect_url;
    }else{
        url = store_url;
    }

    //初次加载页面调用图表
    requestCharts();

    //点击搜索时候调用图表
    searchTime.on("click", function(){
        var dataStartTime = new Date(startTime.val());
        var dataEndTime = new Date(endTime.val());

        if(dataEndTime < dataStartTime){
            layer.msg("结束时间不能小于开始时间", window.option.msgFailed);
        }else{
            requestCharts();
        }
    });


    function requestCharts(){
        var startTime = $(".js-form-evaluatetime input[name=evaluate-start]").val();
        var endTime = $(".js-form-evaluatetime input[name=evaluate-end]").val();

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: formEvaluate.serialize()
        }).done(function(data){

            if(data.status === 0){    
                myChart.setOption({
                    xAxis: {
                        data: data.categories
                    },
                    series: [{
                        name: data.type.count.name,
                        data: data.type.count.data
                    }]
                });

                getOtherCharts(data);

                html = template("js-tpl", data);
                wrap.html(html);
            }
        }).fail(function(data){
            layer.msg(data.msg, option.msgFailed);
        });
    }


    function getOtherCharts(data){

        cityButtion.on("click", "input", function(){

            var dataTitle = $(this).data("title");

            if(dataTitle === "count"){
                myChart.setOption({
                    yAxis: [
                        {
                            type: "value",
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [{
                        name: data.type.count.name,
                        data: data.type.count.data
                    }]
                });
            }else if(dataTitle === "rate"){
                myChart.setOption({
                    yAxis: [
                        {
                            type: "value",
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value}%'
                            }
                        }
                    ],
                    series: [{
                        name: data.type.rate.name,
                        data: data.type.rate.data
                    }]
                });

            }else if(dataTitle === "score"){
                myChart.setOption({
                    yAxis: [
                        {
                            type: "value",
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [{
                        name: data.type.score.name,
                        data: data.type.score.data
                    }]
                });

            }else if(dataTitle === "times"){
                myChart.setOption({
                     yAxis: [
                        {
                            type: "value",
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [{
                        name: data.type.times.name,
                        data: data.type.times.data
                    }]
                });
            }
        });
    }
}
