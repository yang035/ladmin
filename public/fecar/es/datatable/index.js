

const selector = ".dataTables_length";


$(selector).each(function(){
	let $this = $(this);
	let $form = $this.parents("form").eq(0);
	let $select = $this.find("select").eq(0);

	$select.on("change", function(){
		$form.trigger("submit");
	});
});
