/**
 * Created by Administrator on 2016/9/26.
 */
        Zepto(function(){
        //滚动监听
            var widH = $(window).height() - $('header').height();
           // $(".wrap").height(widH-$(".report_tab").height());
            $(".wrap_box").height(widH);
            $('.report_cont_wrap').height(widH);
            $('.report_jx_l').height(widH-$(".report_tab").height());
            $('.report_jx_r').height(widH-$(".report_tab").height());
 
            var firH = $("#repFir").height();
            var secH = $("#repSec").height()+firH;
            var thiH = $("#repThi").height()+secH;
            var fouH = $("#repFou").height()*0.2+thiH;
            var fifH = $("#repFif").height()+fouH;

           $(".report_jx_r").scroll(function(){
                var i = 0;
                var lfLi = $(".report_wrap_rl");
                var scT = $(this).scrollTop();
                $("#wrap_box").addClass("longP");
                // $(".cbs-repc-cont").removeClass("fixdL");
                if(scT==0){
                    $("#wrap_box").removeClass("longP");
                }
                if (scT > 0 && scT < firH-300) {
                    i = 0;
                    lfLi.eq(i).addClass("active");
                    lfLi.eq(i).siblings().removeClass("active");
                } else if (scT > firH-300 && scT < secH) {
                    i = 1;
                    lfLi.eq(i).addClass("active");
                    lfLi.eq(i).siblings().removeClass("active");
                } else if (scT > secH && scT < thiH) {
                    i = 2;
                    lfLi.eq(i).addClass("active");
                    lfLi.eq(i).siblings().removeClass("active");
                } else if (scT > thiH && scT < fouH) {
                    i = 3;
                    lfLi.eq(i).addClass("active");
                    lfLi.eq(i).siblings().removeClass("active");
                }  else if (scT > fouH && scT < fifH) {
                    i = 4;
                    lfLi.eq(i).addClass("active");
                    lfLi.eq(i).siblings().removeClass("active");
                }
            });

            // //侧栏
            $(".report_wrap_rl").click(function() {
                /*  $(".cbs-repc-cont").css({"top":$('header').height(),"position":"relative"});
                 $(".repCt").css({"display":"none"});  */
                // $(".report_cent").addClass("fixdL");
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active");
                }
            });
            //tab
            $(".report_tab a").click(function() {
                var slidLs = $(this).attr("data-href");
                if(slidLs!="#slid1"){
                    if(slidLs=="#slid3"){
                        $(".report_cont_wrap").addClass("slide_auto");
                    }else{
                        $(".report_cont_wrap").removeClass("slide_auto");
                    }
                	/*$(".car_type_bg").hide();*/
                    // $('.wrap_box').addClass("longPN");
                   /* if(!$(".wrap_box").hasClass("wrap_pos1")){
                        $(".wrap_box").addClass("wrap_pos1");
                    }*/
                    $(".report_cont_wrap").css({"position":"relative","overflow":"scroll"});
                    // $(".report_cont_wrap").addClass("r_pdT");
                      $('.wrap_box').removeClass("longP");
               }else{
                    $(".car_type_bg").show();
                    $(".wrap_box").removeClass("wrap_pos1");
                    // $(".report_cont_wrap").css("position","fixed");
                    // $(".report_cont_wrap").removeClass("r_pdT");
                    $(".report_cont_wrap").removeClass("slide_auto");
                }


                $(".wrap").scrollTop(0);
                $(slidLs).addClass("slidC");
                $(slidLs).siblings().removeClass("slidC");
                if (!$(this).hasClass("cur")) {
                    $(this).addClass("cur");
                    $(this).siblings().removeClass("cur");
                }
            });

            /*点击查看详细维修保养记录*/
            $(".report_sg_txt").click(function(){
                   $(".report_tab a").eq(1).addClass("cur");
                   $("#slid2").addClass("slidC");
                   $(".wrap_box").addClass("wrap_pos1");
                   $("#slid2").siblings().removeClass("slidC");
                   $(".report_tab a").eq(1).siblings().removeClass("cur");
               })


            $(".report_cont_wrap").scroll(function(){

               if($(this).scrollTop()>0){
                   $(".wrap_box").removeClass("wrap_pos1").addClass("report_tr");
               }else{
                   $(".wrap_box").addClass("wrap_pos1").removeClass("report_tr");
               }
            })








            /*.report_tab滚动一定位置后定位*/
            $(window).scroll(function(){
                var scT = $(".wrap").scrollTop();
                /*var scT = $(window).scrollTop();*/
                if(scT>=60){
                    $(".report_tab").addClass("fixTap");
                   /* $(".report_jx_l").addClass("report_jx_lfx");*/
                }else{
                    $(".report_tab").removeClass("fixTap");
                   /* $(".report_jx_l").removeClass("report_jx_lfx");*/
                }
            });


           /* $(".center_t_add").click(function(){
                $(".center_pos").show()
                *//*$(".center_pos").fadeIn(300)*//*
            })*/
        })