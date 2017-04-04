
$(function(){

    tagCharts();

});


function tagCharts(){
    var urls = getUrl();
    var detect_url = urls.detect;
    var store_url = urls.store;
    var wrap = $(".js-data-wrap");
    var navTabs = $(".js-nav-tabs li:first");
    var tagTotal = echarts.init(document.getElementById('tag-total'));
    var tagGood = echarts.init(document.getElementById('tag-good'));
    var tagBad = echarts.init(document.getElementById('tag-bad'));
    var searchTime = $(".js-searchtime");
    var formEvaluate =  $(".js-form-evaluate");
    var startTime = $(".js-form-evaluate input[name=evaluate-start]");
    var endTime = $(".js-form-evaluate input[name=evaluate-end]");
    var html = "";
    var url = "";

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
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: formEvaluate.serialize()
        }).done(function(data){
            if(data.status === 0){

                //标签使用总体情况
                tagTotalOption = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    color: data.type.total.color,

                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },

                    series : [
                        {
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data: data.type.total.value
                        }
                    ]
                };

                tagTotal.setOption(tagTotalOption);

                //点赞标签使用情况
                tagGoodOption = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    color: data.type.good.color,

                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data: data.type.good.value
                        }
                    ]
                };

                tagGood.setOption(tagGoodOption);

                //吐槽标签使用情况
                tagBadOption = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },

                    color: data.type.bad.color,

                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data: data.type.bad.value
                        }
                    ]
                };

                tagBad.setOption(tagBadOption);

                html = template("js-data-tpl", data);
                wrap.html(html);
            }

        }).fail(function(data){
            layer.msg(data.msg, option.msgFailed);
        });
    }
}
