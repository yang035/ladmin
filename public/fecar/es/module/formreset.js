

const option = require("../config/option");


const selector = "form";


$(selector).each(function(){
	let $this = $(this);
	$this.on("reset", function(){
		$this.clearForm();
		return false;
	});
});
