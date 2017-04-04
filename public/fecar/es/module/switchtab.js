

const clonePrefix = ".jsi-";

function SwitchFormTabs(o) {
	this.$lsReference = $(o.reference);
	this.$lsTarget = $(o.target);

	this.referencesSelector = o.referencesSelector || ".js-item";
	this.targetsSelector = o.targetsSelector || ".js-item";

	this.$itemsTarget = this.$lsTarget.find(this.targetsSelector);

    this.eventType = o.eventType || "click";
	this.callBack = o.callBack;

	this.init();
}

SwitchFormTabs.prototype.init = function(i){
    let _ = this;

    _.$lsReference.each(function(i){
		let $this = $(this);

		$this.on(_.eventType, _.referencesSelector, function(event){
			let $this = $(this);
			let $lastForm = _.$itemsTarget.filter(":visible");
			let indexThis = $this.index();
			let indexLast = $lastForm.index();
			let $thisForm = _.$itemsTarget.eq(indexThis);
			event.preventDefault();

			if( $lastForm.length === 1 && indexLast !== -1){
				_.$lsReference.eq(indexThis).find(":radio").eq(indexThis).prop("checked", true);

				let $last = $lastForm.find(clonePrefix + indexThis);
				let $now = $thisForm.find(clonePrefix + indexLast);

				$now.each(function(index){
					let $this = $last.eq(index);

					$this.find(".js-date-picker").datepicker("remove");

					let $clone = $this.clone(true, true);

					let $textareaThis = $this.find("textarea");
					let $selectThis = $this.find("select");
					let $textareaClone = $clone.find("textarea");
					let $selectClone = $clone.find("select");


					$textareaThis.each(function(index){
						$textareaClone.eq(index).val( $textareaThis.eq(index).val() );
					});

					$selectThis.each(function(index){
						$selectClone.eq(index).val( $selectThis.eq(index).val() );
					});

					$now.eq(index).replaceWith($clone);

					$clone.find(".js-date-picker").datepicker(option.datepicker);
				});
			}

	        _.$itemsTarget.eq(indexThis).show().siblings().hide();

	        if ( typeof _.callBack === "function") {
	            _.callBack(indexThis);
	        }
	    });
	});

	let $active = _.$lsReference.find(".js-ref-active");
	if( $active.length === 1 ){
		$active.trigger(_.eventType);
	}else{
		_.$lsReference.find(_.referencesSelector).eq(0).trigger(_.eventType);
	}
};


const reference = ".js-switch-ref";
const target = ".js-switch-target";
const referencesSelector = ".js-ref-item";
const targetsSelector = ".js-target-item";

let ins = new SwitchFormTabs({
	reference,
	target,
	referencesSelector,
	targetsSelector
});
