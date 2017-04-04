

// form的reset事件，清空所有值，使用jquery form中的clearform

const option = require("../config/option");


const selector = "form";


$(selector).each(function(){
	let $this = $(this);
	$this.on("reset", function(){
		$this.clearForm();
		return false;
	});
});
