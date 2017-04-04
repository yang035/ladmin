/**
 * 公共javascript
 */

if (typeof jQuery === 'undefined') {
    throw new Error('This requires jQuery');
}

if (typeof layer === 'undefined') {
    throw new Error('This requires layer');
}

;(function ($, window, undefined) {
    var timeout = 2000;  //刷新时间
    var datePicker = {
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true,
        weekStart: 0
    };

    var ajaxForm = {
        dataType : "json",
        success : function(data) {
            if(data.status === 1) {
                layer.closeAll();

                layer.msg(data.msg, {time: timeout, icon: 1});
            } else {
                layer.msg(data.msg, {time: timeout, icon: 2});
            }

            if(data.type === 1) {
                setTimeout(function() {
                    location.reload();
                }, timeout );
            }else if(data.type === 2) {
                setTimeout(function() {
                    location.href = data.url;
                }, timeout );
            }
        },
        error : function() {
            $.errorMsg("请求服务器失败");
        }
    };   

    $.extend({
        /**
         * 错误提示
         * @param json data 格式： {info : "", url : "", status : 0}
         */
        errorMsg : function(data) {
            //如果是字符串转为JSON格式
            if( ! $.isPlainObject(data) ) {
                data = {msg : data, type : 0};
            }

            var type = parseInt(data.type);
            
            if(type == 1) {
                layer.msg(data.msg + "，页面正在刷新~", {icon: 2, time : timeout}, function () {
                    location.reload();
                });
            } else if(type == 2) {
                layer.msg(data.msg + "，页面正在跳转~", {icon: 2, time : timeout}, function () {
                    location.href = data.url;
                });
            } else {
                layer.msg(data.msg, {icon: 2});
            }
        },

        /**
         * 成功提示
         * @param string msg 消息内容
         * @param json data 格式： {info : "", url : "", status : 0}
         */
        successMsg : function(data) {
            var type = parseInt(data.type);

            if(type == 1) {
                layer.msg(data.msg + "，页面正在刷新~", {icon: 1, time : timeout}, function () {
                    location.reload();
                });
            } else if(type == 2) {
                layer.msg(data.msg + "，页面正在跳转~", {icon: 1, time : timeout}, function () {
                    location.href = data.url;
                });
            } else {
                layer.msg(data.msg, {icon: 1});
            }
        },

        submitForm : function() {
            var submitForm = $("#submit-form");
            submitForm.on("submit", function () {
                var submitBtn = submitForm.find("[type=submit]");

                submitBtn.addClass("disabled").attr("autocomplete", "off").prop("disabled", true);
                $.post( submitForm.attr("action"), submitForm.serialize() ).success(function (data) {
                    if (data.status) {
                        $.successMsg(data);
                    } else {
                        $.errorMsg(data);
                    }
                    submitBtn.removeClass("disabled").prop("disabled", false);
                });

                return false;
            });
        }

    });

    // 弹层
    $("a[target='pop-layer']").on("click", function(e) {
        var $this = $(this);
        var url = $this.prop("href");
        e.preventDefault();

        $.ajax({
            url: url,
            type: "GET"
        }).done(function(data) {
            if( $.isPlainObject(data) ) {
                if(data.status == 0) {
                    $.errorMsg(data.msg);
                } else if(data.status == 1) {
                    $.successMsg(data.msg);
                } else {
                    var confirm = $this.data("confirm") || "您确定要删除？";

                    layer.confirm(confirm, {icon: 0, title:"警告"}, function(index) {
                        $.get( url, {"confirm" : 1} ).success(function(data) {
                            if(data.status) {
                                $.successMsg(data);
                            } else {
                                $.errorMsg(data);
                            }
                        });
                    });
                }

                return false;
            }

            var title;
            var $title = $(data).filter(".js-title");

            if($title.length > 0) {
                title = $title.text();
            }

            layer.open({
                title: title,
                type: 1,
                content: data
            });

            var $form = $(".js-ajax-form-layer");

            try {
                $form.ajaxForm(ajaxForm);
            }catch(e){}

            try {
                $form.find(".js-date-picker").datepicker(datePicker);
            }catch(e){}

        }).fail(function () {
            $.errorMsg("请求服务器失败");
        })

    });

    //搜索功能
    $("#search").on("click", function () {
        var searchForm = $(this).closest("form");
        var url = searchForm.attr('action');
        var query = searchForm.serialize();
        query = query.replace(/(&|^)(\w*?\d*?\-*?_*?)*?=?((?=&)|(?=$))/g, '');
        query = query.replace(/^&/g, '');

        if (url.indexOf('?') > 0) {
            url += '&' + query;
        } else {
            url += '?' + query;
        }

        window.location.href = url;

        return false;
    });


})(jQuery, window);

