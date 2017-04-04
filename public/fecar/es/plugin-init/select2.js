

const selector = {
	multi: ".js-select-multi"
}

if($.fn.select2){
	$.fn.select2.defaults.set("theme", "classic");

	$(selector.multi).each(function(){
		this.mutiple = true;

		$(this).select2();
	});
}
