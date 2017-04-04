

// 输入框后带有勾选框（例如：车牌号输入框后勾选无车牌），切换该输入框的required

const selector = $(".js-toggle-required");


$(selector).each(function(){
	let $this = $(this);
	let $checkbox = $this.find(":checkbox");
	let $input = $this.find(":input").not(":checkbox");

	$checkbox.on("change", function(){
		if($checkbox.prop("checked")){
			$input.prop("required", false);
		}else{
			$input.prop("required", true);
		}
	});
});
