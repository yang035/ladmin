

(function(){
	let $radio = $(".js-radio-wrap");
	let $inputWrap = $(".js-input-wrap");
	let $input = $inputWrap.find("input");

	$radio.on("change", toggle);

	function toggle(){
		let $this = $radio.find(":checked");
		let state = parseInt($this.data("state"));

		if(state){
			$inputWrap.show();
			$input.prop("required", true);
			$input.prop("disabled", false);
		}else{
			$inputWrap.hide();
			$input.prop("required", false);
			$input.prop("disabled", true);
		}
	}

	toggle();
})();
