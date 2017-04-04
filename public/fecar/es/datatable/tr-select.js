

const $singleTr = $(".js-tr-single");
const $multiTable = $(".js-table-multi");


$singleTr.on("click", "tr", function(){
	let $this = $(this);

	if(!(window.getSelection().toString())){
		$this.toggleClass("info").siblings().removeClass("info");
	}
});

$multiTable.on("change", "th :checkbox", function(){
	let $this = $(this);
	let $children = $this.parents("table").find("tbody :checkbox");

	if( $this.prop("checked") === true ){
		$children.prop("checked", true);
	}else{
		$children.prop("checked", false);
	}
});
