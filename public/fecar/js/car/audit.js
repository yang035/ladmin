(function(){
    
        //弹窗
        let urls = getUrl();
	    let url = urls.refer;
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
			
	(function unitsAdd(){
		let $ls = $(".jsl-units-add");
		let $title = $ls.find(".js-title");
		let selectorRadio = ":checked";
		let $btn = $ls.find(".js-add");
		let tpl = template.compile(getTemplate(".jst-units-add"));
		let num = 0;

		$btn.on("click", function(){
			let title = $title.val();
			let $radio = $ls.find(selectorRadio)
			let state = $radio.data("state");
			state = parseInt(state);

			if(title.length === 0){
				layer.msg("请输入加装改装项", window.option.msgWarn)
				return;
			}

			if(isNaN(state)){
				layer.msg("请选择原件是否可提供", window.option.msgWarn)
				return;
			}

			let data = {
				title,
				state,
				num
			}

			$ls.before(tpl(data));

			$title.val("");
			$radio.prop("checked", false);
			num++;
		});
	})();

	(function checkIsNoCard(){
		const selector = $(".js-toggle-nocard");

		$(selector).each(function(){
			let $this = $(this);
			let $checkbox = $this.find(":checkbox");
			let $input = $this.find(":input").not(":checkbox");
			let flag = true;
			
			$input.each(function(){
				let $that = $(this);
				if($that.is(':disabled')) {
					flag = false;
					return false;
				}
			});

			$checkbox.on("click", function(){
				if( flag == true ){
					$input.prop("disabled", true);
					$input.val('');
					flag = false;
				}else{
					$input.prop("disabled", false);
					flag = true;
				}
			});
		});
	})();

	let $color = $(".js-be-color");
    let $other = $(".js-other-color");
    $color.on("change",function(){
    	let $this = $(this);
    	if($this.val() == '其它'){ 		
			$other.prop("disabled", false);	
				
		}else{	
		    $other.prop("disabled", true);
		}           
    });

    //所有人属性
    let $select_reason = $('.js-validate-select').find("select");
    let $select_res = $('.js-validate-select-res').find("select");
    $select_reason.on("change",function(){
    	let $this = $(this);
    	if($this.val() == 1){
    		
			$select_res.prop("disabled", true);
			$select_res.val('');	
				
		}else{
				
		    $select_res.prop("disabled", false);
		}           
    });

    //选择无牌的时候才显示需要勾选
    let $checkbox_reason = $('.js-validate-checkbox').find(':checkbox');
    let $checkbox_res = $('.js-validate-checkbox-res').find(':input');
    let $text_res = $('.js-validate-checkbox-res-belong').find(':input');
    $checkbox_reason.on("click",function(){
    	let $this = $(this);
    	if($this.is(':checked')){
    		$text_res.prop("disabled", true);
    		$text_res.prop('checked', false);
    		$text_res.val('');	
    		$checkbox_res.prop("disabled", false);		
		}else{
			$checkbox_res.prop('checked', false);
			$checkbox_res.prop("disabled", true);
			$text_res.prop("disabled", false);	
		}           
    });

	(function checkForm() {
			let selector = {
				textarea : ".js-ajax-textarea-text",
				checkstatus : '[name=status]:checked',
				vin : '.js-vin-require',
				text : '.js-text-check-about-config',
				nocard : '.js-toggle-nocard',
			}

			let text = $(selector.textarea);
			let status = $(selector.checkstatus);
			let vin = $(selector.vin);
			let reg = /(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[IOQ]+$)[0-9a-zA-Z]{17}/;
			let vin_text = vin.val();
			let key  = $(selector.text);
			let nocard = $(selector.nocard);
			let $checkbox = nocard.first().find(":checkbox");
			let $select_1 = nocard.first().find(":selected").eq(0);
			let $select_2 = nocard.first().find(":selected").eq(1);
			let $input = nocard.first().find("[type=text]");
			let $checkbox_date = nocard.last().find(":checkbox");
			let $input_date = nocard.last().find(":input").not(':checkbox');

			if(vin_text == '') {
				vin.focus();
				layer.msg("请输入VIN码", option.msgFailed);
				return false;
			}

			if( reg.exec(vin_text) == null ) {
				vin.focus();
				layer.msg("VIN码只能为17位的数字和字母组成，且字母I、O和Q不能使用！", option.msgFailed);
				return false;
			}

			if($input.val() == '' || $select_1.val() == '' || $select_2.val() == '' ) {
				if($checkbox.is(':checked') == false) {
					$checkbox.focus();
					layer.msg("请选择车牌号！", option.msgFailed);
					return false;
				}
			}

			if($checkbox_date.is(':checked') == false && $input_date.val() =='') {
					$checkbox_date.focus();
					layer.msg("请填写交强险日期！", option.msgFailed);
					return false;
			}

			if(key.find('input[type=text]').eq(0).val() == '' && key.find('input[type=text]').eq(1).val() == '' && key.find('input[type=text]').eq(2).val() == '' ) {
				key.find('input[type=text]').eq(0).focus();
				layer.msg("车辆钥匙三个至少填一个！", option.msgFailed);
				return false;
			}

			if(status.val() == 10 && text.val()=='') {
				text.focus();
				layer.msg("审核不通过备注不能为空！", option.msgFailed);
				return false;
			}

			return true;
		})();
		
		//选择提交信息中不通过时显示错误数量文本框
		let $eLcount = $('.js-error-count');
		let $eLdisabled = $('.js-error-disabled');		
		$($eLcount).hide();
		$($eLdisabled).prop("disabled", true);
		$('.js-audit-finish').on('click','input',function(){   
    	    var index = $('.js-audit-finish input').index($(this));
    	    if(index == 1){
    		    $($eLcount).show();
    		    $($eLdisabled).prop("disabled", false);
    	    }else{
    		    $($eLcount).hide();
    		    $($eLdisabled).prop("disabled", true);
    	    }
    	});	
})();
