

const option = require("../config/option");


const selector = {
	bonsai: ".js-bonsai",
	bonsaiRadio: ".js-bonsai-radio",
	bonsaiCheckbox: ".js-bonsai-checkbox"
}

$(selector.bonsai).find(">ol").each(function(){
	$(this).bonsai(option.bonsai);
});

$(selector.bonsaiRadio).find(">ol").each(function(){
	$(this).bonsai(option.bonsaiRadio);
});

$(selector.bonsaiCheckbox).find(">ol").each(function(){
	$(this).bonsai(option.bonsaiCheckbox);
});
