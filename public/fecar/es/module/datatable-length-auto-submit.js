

// 搜索表单中切换一页显示数量时自动提交

const selector = ".dataTables_length";


$(selector).each(function(){
	let $this = $(this);
	let $form = $this.parents("form").eq(0);
	let $select = $this.find("select").eq(0);

	$select.on("change", function(){
		$form.trigger("submit");
	});
});
