

function initBrandChoose(){
	const selector = {
		lsAppend: ".jsl-brand",
		tpl: ".jst-brand",
		btnAdd: ".js-btn-brand",
		lsChoose: ".jsl-brand-choose",
		btnChoose: ".js-btn-brand-save"
	}

	let $lsAppend = $(selector.lsAppend);
	let $lsChoose = $(selector.lsChoose);
	let $btnChoose = $(selector.btnChoose);
	let $btnAdd = $(selector.btnAdd);

	let tpl = getTemplate(selector.tpl);

	$btnChoose.on("click", function(){
		html = "";

		$lsChoose.find("input:checked").each(function(){
			html += template.compile(tpl)(this);
		});

		$btnAdd.siblings().remove();
		$lsAppend.prepend(html);

		layer.close(window.indexLayer);
	});

}


module.exports = initBrandChoose;
