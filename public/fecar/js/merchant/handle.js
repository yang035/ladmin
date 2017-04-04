;(function ($, window, undefined) {

    var requestUrlJson = JSON.parse( $("#request-url").text() );
    var $cityId = $("#city-id");
    var $adminId = $("#admin-id");
    var $merchantId = $("#merchant-id");

    $cityId.on("change", function () {
        var cityId = parseInt( $(this).val() );
        var merchantId = parseInt( $merchantId.val() );
        var optionHtml = '<option value="">--请选择--</option>';

        if(cityId > 0) {
            $.getJSON(requestUrlJson.merchantService, {"city_id" : cityId, "merchant_id" : merchantId}).success(function (data) {
                if(data.length > 0) {
                    $.each(data, function (i, item) {
                        optionHtml += '<option value="'+item.id+'" '+item.selected+'>'+item.realname+'</option>';
                    });
                }

                $adminId.empty().html(optionHtml);
            }).error(function () {
                $.errorMsg("服务器异常");
            });
        } else {
            $adminId.empty().html(optionHtml);
        }

    });

    $cityId.trigger("change");

})(jQuery, window);