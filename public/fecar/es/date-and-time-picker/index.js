

const option = require("../config/option");


const selector = {
	date: ".js-date-picker",
	time: ".js-time-picker",
	datetime: ".js-datetime-picker"
}

try {
	$(selector.date).each(function(){
		$(this).datepicker(option.datepicker);
	});

	$(selector.time).each(function(){
		$(this).timepicker(option.timepicker);
	});

	$(selector.datetime).each(function(){
		$(this).datetimepicker(option.datetimepicker);
	});
}catch(e){}
