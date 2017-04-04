;(function ($, window, undefined) {

    var requestUrlJson = JSON.parse( $("#request-url").text() );
    var $timeSegmentId = $("#time-segment");
    var $readyTimeId = $("#ready-time");
    var $cityId = $("#city-id");
    var $noteRecordId = $("#note-record");
    var $isStoreId = $("#is-store");
    var $readyAddress = $("#ready-address");
    var $storeId = $("#store-id");

    var isStoreFlag = true;   // 控制到店开关
    var isReadyTimeFlag = true;  // 控制预约检测日期开关

    if($noteRecordId.length > 0) {
        // 加载备注信息和操作记录
        $.get(requestUrlJson.noteRecord).success(function (data) {
            $noteRecordId.append(data);
        }).error(function () {
            $.errorMsg("服务器异常");
        });
    }

    // 根据城市获取门店及分配时间片段
    $cityId.on("change", function () {
        var cityId = $(this).val();
        if(cityId) {
            // 选中到店检测
            if( $isStoreId.is(":checked") && isStoreFlag) {
                var optionHtml = '<option value="">请选择</option>';
                var url = requestUrlJson.store;

                $.getJSON(url, {"city_id" : cityId}).success(function (data) {
                    if(data.length > 0) {
                        $.each(data, function(i, item) {
                            optionHtml += '<option value="'+item.id+'">'+item.store_name+'</option>';
                        });

                        $readyAddress.prop("disabled", true);
                        $storeId.prop("disabled", false).html(optionHtml);
                    } else {
                        $cityId.val("");
                        $readyAddress.prop("disabled", false);
                        $storeId.prop("disabled", true)
                        $.errorMsg("该城市还没添加门店");
                    }
                }).error(function () {
                    $.errorMsg("服务器异常");
                });
            }

            // 预约检测日期处理
            var readyTime = $readyTimeId.val();
            if(readyTime && isReadyTimeFlag) {
                var url = requestUrlJson.timeSegment;

                $.get(url, {"city_id" : cityId, "ready_time" : readyTime}).success(function (data) {
                    if( $.isPlainObject(data) ) {
                        $readyTimeId.val("");
                        $timeSegmentId.empty();
                        $.errorMsg(data.msg);
                    } else {
                        $timeSegmentId.html(data).show();
                    }
                }).error(function () {
                    $.errorMsg("服务器异常");
                });
            }

        } else {
            $readyTimeId.val("");
            $.errorMsg("请选择车辆所在地");
        }

        isStoreFlag = true;
        isReadyTimeFlag = true;
    });

    $timeSegmentId.empty();

    $readyTimeId.datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true,
        weekStart: 0
    }).on("changeDate", function () {
        isStoreFlag = false;
        isReadyTimeFlag = true;
        $cityId.trigger("change");
    });

    $isStoreId.on("click", function () {
        if(this.checked) {
            isStoreFlag = true;
            isReadyTimeFlag = false;
            $cityId.trigger("change");
        } else {
            $readyAddress.prop("disabled", false);
            $storeId.prop("disabled", true);
        }
    });

})(jQuery, window);