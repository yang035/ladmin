

(function(){
	let $elCounselorAdd = $(".js-btn-counselor");
	let $lsCheckedWrap = $(".jsl-counselor-checked");

	let $layer = $(".js-layer-counselor");

	let $lsItems = $(".jsl-counselor-additem");
	let $lsButton = $(".jsl-counselor-add");

	let $btnSave = $(".js-layer-save");
	let $btnReset = $(".js-layer-reset");
	let $elAdd = $(".js-carsource-add");
	let $tpl = $(".js-carsource-tpl");
	let html = "";

	$elCounselorAdd.on("click", function(){
		layer.open({
			title: "选择卖车顾问",
			type: 1,
			content: $layer
		});
	});

	$lsButton.on("change", ":radio", function(){
		let $this = $(this);
		let city = $this.data("city");

		$lsItems.hide();
		if(city === "all"){
			$lsItems.find("label").show();
		}else{
			$lsItems.find("label").hide();
			$lsItems.find("." + city).show();
		}
		$lsItems.show();
	});

	$btnSave.on("click", function(){
		html = "";
		var tpl = getTemplate(".jst-counselor");

		$lsItems.find("input:checked").each(function(){
			html += template.compile(tpl)(this);
		});

		$lsCheckedWrap.html(html);

		layer.closeAll();
	});

	$btnReset.on("click", function(){
		$lsItems.find("input:checked").each(function(){
			this.checked = false;
		});
	});


	$elAdd.on("click", function(){
	    layer.open({
	        title: "新增车源信息",
	        type: 1,
	        content: $tpl
	    });
	});

	

})();
